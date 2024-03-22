<?php

namespace App\EndpointControllers;

/**
 * Issue Token to Authenticated Users
 *
 * This class will check a username and password against those held in the 
 * database. If authentication is successful it will return a JWT that expires after 30 minutes.
 *
 * @author James Sowerby
 * @studentID w21023500
 */

 class Token extends Endpoint { 

    private $sqlAdmin = "SELECT adminID, password FROM admin WHERE email = :email";
    private $sqlParticipant = "SELECT participantID, password FROM participant WHERE email = :email";
    private $sqlVolunteer = "SELECT volunteerID, password FROM volunteer WHERE email = :email";

    private function generateJWT($id, $role) { 
        $secretKey = SECRET;
        $time = time();
        $payload = [
            'id' => $id,
            'role' => $role,
            'exp' => strtotime('+ 30 minutes', $time),
        ];
        
        $jwt = \Firebase\JWT\JWT::encode($payload, $secretKey, 'HS256');
        
        return $jwt;
    }
    
    public function __construct() {

        switch(\App\Request::method()){
            case 'GET':
            case 'POST':
                $this->checkAllowedParams();
                $dbConn = new \App\Database(MAIN_DATABASE);
                
                if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
                    throw new \App\ClientError(401);
                }

                if (empty(trim($_SERVER['PHP_AUTH_USER'])) || empty(trim($_SERVER['PHP_AUTH_PW']))) {
                    throw new \App\ClientError(401);
                }

                $email = $_SERVER['PHP_AUTH_USER'];
                $password = $_SERVER['PHP_AUTH_PW'];

                // Check if the user is an admin
                $data = $dbConn->executeSQL($this->sqlAdmin, [':email' => $email]);
                if (count($data) === 1 && password_verify($password, $data[0]['password'])) {
                    $token = $this->generateJWT($data[0]['adminID'], 'admin');
                    $data = ['token' => $token];
                    parent::__construct($data);
                    break;
                }

                // Check if the user is a participant
                $data = $dbConn->executeSQL($this->sqlParticipant, [':email' => $email]);
                if (count($data) === 1 && password_verify($password, $data[0]['password'])) {
                    $token = $this->generateJWT($data[0]['participantID'], 'participant');
                    $data = ['token' => $token];
                    parent::__construct($data);
                    break;
                }

                // Check if the user is a volunteer
                $data = $dbConn->executeSQL($this->sqlVolunteer, [':email' => $email]);
                if (count($data) === 1 && password_verify($password, $data[0]['password'])) {
                    $token = $this->generateJWT($data[0]['volunteerID'], 'volunteer');
                    $data = ['token' => $token];
                    parent::__construct($data);
                    break;
                }

                // If none of the above conditions match, authentication fails
                throw new \App\ClientError(401);
                break;

            default:
                throw new \App\ClientError(405);
                break;
        }
    }
}

