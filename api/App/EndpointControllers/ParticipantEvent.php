<?php

/**
 * 
 *
 * @author Antonio Gorgan
 * This endpoint is used to make participants attend an eventid. participantID is linked to the eventid. 
 * When a participant is inserted into the list an available space is deducted from the space field. 
 * 
 */ 

namespace App\EndpointControllers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ParticipantEvent extends Endpoint {

    public function __construct(){
        $id = $this->validateToken();
        $this->checkUserExists($id);
        switch(\App\Request::method()) 
        {
            case 'GET':
                $data = $this->getList($id);
                break;
            case 'POST':
                $data = $this->joinEvent($id);
                break;
            case 'DELETE':
                $data = $this->cancelEvent($id);
                break;
            default:
                throw new \App\ClientError(405);
                break;
        }
        parent::__construct($data);
    }

    private function validateToken() {
        $secretkey = SECRET;    

        $jwt = \App\Request::getBearerToken();

        try {
            $decodedJWT = \Firebase\JWT\JWT::decode($jwt, new \Firebase\JWT\Key($secretkey, 'HS256'));
        } catch (Exception $e) {
            error_log('Error decoding token: ' . $e->getMessage());
            error_log('Received token: ' . $jwt);
            throw new \App\ClientError(401);
        }
        if (!isset($decodedJWT->exp) || !isset($decodedJWT->id)) { 
            throw new \App\ClientError(401);
        }

        return $decodedJWT->id;
    }

    private function checkUserExists($id)
    {
        $dbConn = new \App\Database(MAIN_DATABASE);
        $sql = "SELECT participantID FROM participant WHERE participantID = :id";
        $sqlParameters = [':id' => $id];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
        if (count($data) != 1) {
            throw new \App\ClientError(401);
        }
    }

    private function checkParticipantEligible($id){
        $dbConn = new \App\Database(MAIN_DATABASE);
        $sql = "SELECT isEligible FROM participant WHERE participantID = :id";
        $sqlParameters = [':id' => $id];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
        if (count($data) != 1) {
            throw new \App\ClientError(401);
        }
        $eligible = $data[0]['isEligible'];

        if ($eligible === 0) {
            throw new \App\ClientError(467); // Not eligible
        }
    }

    private function event() 
    {  
        if (!isset(\App\REQUEST::params()['eventid']))
        {
            throw new \App\ClientError(422);
        }
 
        if (!is_numeric(\App\REQUEST::params()['eventid']) )
        {
            throw new \App\ClientError(402);
        }
        $eventid = \App\REQUEST::params()['eventid'];
        return htmlspecialchars($eventid);

    }

    

    private function checkSpaceAvailable($eventid) {
        $dbConn = new \App\Database(MAIN_DATABASE);
    
        // Check if there's space available
        $sql = "SELECT space FROM event WHERE eventID = :eventid";
        $sqlParameters = ['eventid' => $eventid];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
    
        if (count($data) === 0) {
            throw new \App\ClientError(404); // eventid not found
        }
    
        $space = $data[0]['space'];
    
        if ($space <= 0) {
            $this->addToWaiting($eventid);
            throw new \App\ClientError(467); // No space available
        }
    }
    
    private function addToWaiting($eventid) {
        $dbConn = new \App\Database(MAIN_DATABASE);
    
        $sql = "SELECT COUNT(*) AS count FROM waitingList WHERE eventID = :eventid";
        $sqlParameters = ['eventid' => $eventid];
        $waitingListData = $dbConn->executeSQL($sql, $sqlParameters);
    
        if ($waitingListData[0]['count'] === 0) {
            // Insert the eventID into the waiting list
            $sql = "INSERT INTO waitingList (eventID) VALUES (:eventid)";
            $dbConn->executeSQL($sql, $sqlParameters);
        }
    }
    

    private function checkTicket($id) {
        $dbConn = new \App\Database(MAIN_DATABASE);
        $sql = "SELECT ticket FROM participant WHERE participantID = :id";
        $sqlParameters = ['id' => $id];
        $data = $dbConn->executeSQL($sql, $sqlParameters);

        $ticket = $data[0]['ticket'];
    
        if ($ticket === 0) {
            throw new \App\ClientError(468); // No tickets available
        }
    }

    private function removeSpace($eventid){ 
        $sqlParameters = [ 'eventid' => $eventid];
        $sql = "UPDATE event SET space = space - 1 WHERE eventID = :eventid";
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql, $sqlParameters);

    }

    private function removeTicket($id){ 
        $sqlParameters = [ ':id' => $id];
        $sql = "UPDATE participant SET ticket = ticket - 1 WHERE participantID = :id";
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql, $sqlParameters);

    }

    private function addSpace($eventid){ 
        $sqlParameters = [ 'eventid' => $eventid];
        $sql = "UPDATE event SET space = space + 1 WHERE eventID = :eventid";
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql, $sqlParameters);

    }

    private function addTicket($id){ 
        $sqlParameters = [ ':id' => $id];
        $sql = "UPDATE participant SET ticket = ticket + 1 WHERE participantID = :id";
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql, $sqlParameters);

    }

    private function userAttends($id, $eventid){
    $dbConn = new \App\Database(MAIN_DATABASE);
    $sql = "SELECT COUNT(*) AS count FROM participantEvent WHERE participantID = :id AND eventID = :eventid ";
    $sqlParameters = [':id' => $id, 'eventid' => $eventid];
    $result = $dbConn->executeSQL($sql, $sqlParameters); // Execute the SQL query and fetch the result
    $count = $result[0]['count'];
    return $count > 0;
}


    private function joinEvent($id) {
        $eventid = $this->event();

        if ($this->userAttends($id,$eventid)){

            throw new \App\ClientError(469);
        }
        
        $this->checkSpaceAvailable($eventid);
        $this->checkTicket($id); 
        $this->checkParticipantEligible($id);
        $sqlParameters = [':id' => $id, 'eventid' => $eventid];
        $dbConn = new \App\Database(MAIN_DATABASE);

        $sql = "SELECT * FROM participantEvent WHERE participantID = :id AND eventID = :eventid";
        $data = $dbConn->executeSQL($sql, $sqlParameters);
        
        if (count($data) === 0) {
            $sql = "INSERT INTO participantEvent (participantID, eventID) VALUES (:id, :eventid)";
        } else {
            $sql = "UPDATE participantEvent SET participantID = :id, eventID = :eventid  
                    WHERE participantID = :id AND eventID = :eventid ";
        }
       
        $data = $dbConn->executeSQL($sql, $sqlParameters);
    
        $this->removeSpace($eventid);
        $this->removeTicket($id);
    
        return [];

    }
    
    private function getList(){
            $where = false; 
            $sql = "SELECT * FROM participantEvent";   
            $dbConn = new \App\Database(MAIN_DATABASE);
            $data = $dbConn->executeSQL($sql);
            return $data;
        }

    private function cancelEvent($id) {
        $eventid = $this->event();
        $this->addSpace($eventid);
        $this->addTicket($id);
        $dbConn = new \App\Database(MAIN_DATABASE);
        $sql = "DELETE FROM participantEvent WHERE participantID = :id AND eventID = :eventid";
        $sqlParameters = [':id' => $id, 'eventid' => $eventid];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
        return $data;

        
    }
}

