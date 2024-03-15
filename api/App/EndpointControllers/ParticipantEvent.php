<?php

/**
 * 
 *
 * @author Antonio Gorgan
 * This endpoint is used to make participants attend an event. participantID is linked to the eventID. 
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
        switch(Request::method()) 
        {
            case 'POST':
                $data = $this->joinEvent($id);
                break;
            case 'DELETE':
                $data = $this->cancelEvent($id);
                break;
            default:
                throw new ClientError(405);
                break;
        }
        parent::__construct($data);
    }

    private function validateToken() {
        $secretkey = SECRET;    

        $jwt = REQUEST::getToken();

        try {
            $decodedJWT = JWT::decode($jwt, new Key($secretkey, 'HS256'));
        } catch (Exception $e) {
            error_log('Error decoding token: ' . $e->getMessage());
            error_log('Received token: ' . $jwt);
            throw new ClientError(401);
        }
        if (!isset($decodedJWT->exp) || !isset($decodedJWT->id)) { 
            throw new ClientError(401);
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
            throw new ClientError(401);
        }
    }

    private function joinEvent($id) {
        $eventID = REQUEST::params()['eventID'];
    
        $dbConn = new \App\Database(MAIN_DATABASE);
    
        // Check if there's space available
        $sql = "SELECT space FROM event WHERE eventID = :eventID";
        $sqlParameters = ['eventID' => $eventID];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
    
        if (count($data) === 0) {
            throw new ClienrError(404); // Event not found
        }
    
        $space = $data[0]['space'];
    
        if ($space <= 0) {
            throw new ClienrError(409); // No space available
        }
    
        // Insert participantEvent
        $sql = "INSERT INTO participantEvent (eventID, participantID) VALUES (:eventID, :id)";
        $sqlParameters = ['eventID' => $eventID, 'participantID' => $id];
        $dbConn->executeSQL($sql, $sqlParameters);
    
        // Remove 1 from space 
        $sql = "UPDATE event SET space = space - 1 WHERE eventID = :eventID";
        $dbConn->executeSQL($sql, $sqlParameters);
    
        return [];
    }
    
    private function cancelEvent($id) {
        if (!isset(REQUEST::params()['eventID']))
        {
            throw new ClientError(422);
        }
 
        $eventID = REQUEST::params()['eventID'];
        
        if (!is_numeric($contentID))
        {
            throw new ClientError(422);
        }
 
        $dbConn = new \App\Database(MAIN_DATABASE);
        $sql = "DELETE FROM participantEvent WHERE participantID = :id AND eventID = :eventID";
        $sqlParameters = [':id' => $id, 'eventID' => $eventID];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
        return $data;
    }

}
