<?php

namespace App\EndpointControllers;

/**
 * An endpoint that returns my name and student id.
 * 
 * @author Pik Sum Siu
 * @studentID w20012367
 */
class AdminToken extends Endpoint
{
    private $sql = "SELECT 
                        adminID,
     
                        password 
                    FROM admin
                    WHERE email = :email";
    private $sqlParams = [];

    public function __construct() {

 
        switch(\App\Request::method()) 
        {
            case 'GET':
            case 'POST':
                $this->checkAllowedParams();

                if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
                    throw new \App\ClientError(401);
                }
                if (empty(trim($_SERVER['PHP_AUTH_USER'])) || empty(trim($_SERVER['PHP_AUTH_PW']))) {
                    throw new \App\ClientError(401);
                }

                $dbConn = new \App\Database(MAIN_DATABASE);
                $this->sqlParams[":email"] = $_SERVER['PHP_AUTH_USER'];
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                
                if (count($data) != 1) {
                    throw new \App\ClientError(401);
                }

                if (!password_verify($_SERVER['PHP_AUTH_PW'], $data[0]['password'])) {
                    throw new \App\ClientError(401);
                }

                $token = $this->generateJWT($data[0]['id']);        
                $data = ['token' => $token];

                parent::__construct($data);
                
                break;
            default:
                throw new \App\ClientError(405);
                break;
        }
    }

    private function generateJWT($id) {

        $secretKey = SECRET;

        $payload = [
            'sub' => $id,
            'iat' => time(),
            'exp' => strtotime('+30 minutes',time()),
            'iss' => $_SERVER['HTTP_HOST']
                    ];

        $jwt = \Firebase\JWT\JWT::encode($payload, $secretKey, 'HS256');

        return $jwt;
        
    }
 
}