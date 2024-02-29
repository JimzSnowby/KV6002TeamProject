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
class Token extends Endpoint
{
    private $sql = "SELECT id, password 
                    FROM account 
                    WHERE email = :email";
    private $sqlParams = [];

    public function __construct(){

        switch(\App\Request::method()) 
        {
            case 'GET':
            case 'POST':
                $this->checkAllowedParams();
                $dbConn = new \App\Database(USERS_DATABASE);
        
                if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
                    throw new \App\ClientError(401);
                }
                if (empty(trim($_SERVER['PHP_AUTH_USER'])) || empty(trim($_SERVER['PHP_AUTH_PW']))) {
                    throw new \App\ClientError(401);
                }
        
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
        }
    }
    
    private function generateJWT($id)
    {
        $secretKey = SECRET;
        $payload = [
            'sub' => $id,
            'exp' => strtotime('+30 minutes', time()),
            'iat' => time(),
            'iss' => $_SERVER['HTTP_HOST']
        ];
        
        $jwt = \Firebase\JWT\JWT::encode($payload, $secretKey, 'HS256');
        
        return $jwt;
    }
}