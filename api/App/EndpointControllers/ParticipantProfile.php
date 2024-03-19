<?php

 /**
 * 
 *
 * @author Maja Bosy
 * This endpoint is used to view and edit participant details in the database 
 */ 

 namespace App\EndpointControllers;

 use Firebase\JWT\JWT;
 use Firebase\JWT\Key;


class ParticipantProfile extends Endpoint {

    
    public function __construct(){
        $id = $this->validateToken();
        $this->checkUserExists($id);        
        switch(\App\Request::method()) 
        {
            case 'GET':
                $data = $this->getParticipant($id);
                break;
            case 'POST':
                $data = $this->updateDetails($id);
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
            $decodedJWT =  \Firebase\JWT\JWT::decode($jwt, new \Firebase\JWT\Key($secretkey, 'HS256'));
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

    private function name() 
    {
        if (!isset(\App\REQUEST::params()['name']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['name']) > 50)
        {
            throw new \App\ClientError(402);
        }
 
       $name = \App\REQUEST::params()['name'];
       return htmlspecialchars($name);
    }

    private function phone() 
    {
        if (!isset(\App\REQUEST::params()['phone']))
        {
            throw new \App\ClientError(422);
        }
 
        if (!is_numeric(\App\REQUEST::params()['phone']))
        {
            throw new \App\ClientError(402);
        }
 
       $phone = \App\REQUEST::params()['phone'];
       return htmlspecialchars($phone);
    }

    private function email() 
    {
        if (!isset(\App\REQUEST::params()['email']))
        {
            throw new \App\ClientError(422);
        }
       $email = \App\REQUEST::params()['email'];
       return htmlspecialchars($email);
    }

    private function password() 
    {
        if (!isset(\App\REQUEST::params()['password']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['password']) > 50)
        {
            throw new \App\ClientError(402);
        }
 
       $password = \App\REQUEST::params()['password'];
       return htmlspecialchars($password);
    }

    private function evidence() 
    {
        if (!isset(\App\REQUEST::params()['evidence']))
        {
            throw new \App\ClientError(450);
        }
 
       $evidence = \App\REQUEST::params()['evidence'];
       return htmlspecialchars($evidence);
    }

    private function getParticipant($id) { 
        $sqlParameters = ['id' => $id];

        $sql = "SELECT name, phone, email, dob FROM participant WHERE participantID = :id";   
        
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql, $sqlParameters);
        return $data;
    }

    private function updateDetails($id) {
       // Retrieve the phone number from the request parameters
       $phone = $this->phone(); 
       $email = $this->email(); 
       $name = $this->name(); 

       $sql = "UPDATE participant SET phone = :phone, email = :email, name = :name WHERE participantID = :id";
       $sqlParameters = ['phone' => $phone, 'email' => $email, 'name' => $name, 'id' => $id];
       
       $dbConn = new \App\Database(MAIN_DATABASE);
       $data = $dbConn->executeSQL($sql, $sqlParameters);
    
       return [];
    }

 }