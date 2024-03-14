<?php

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

        $sqlParameters = ['eventID' => $eventID];
        $sql = "SELECT * FROM participantEvent WHERE eventID = :eventID AND participantID = :id";
        $data = $dbConn->executeSQL($sql, $sqlParameters);

        if (count($data) === 0) {
            $sql = "INSERT INTO participantEvent (eventID, participantID) VALUES (:eventID, :id)";
        } else {
            throw new ClienrError(401);
        }

        $sqlParameters = ['eventID' => $eventID, 'participantID' => $id];
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
