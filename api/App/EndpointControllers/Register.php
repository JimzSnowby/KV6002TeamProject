<?php
/**
 * Register Endpoint
 *
 * This PHP class represents an endpoint for user registration and retrieval of user data.
 * It allows users to register by providing their name, email, and password.
 *
 * @author Maja Bosy
 */

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Register extends Endpoint {
    public function __construct()
    { 
        switch(\App\Request::method()) 
        {
            case 'POST':
                $data = $this->addUser();
                break;
            default:
                throw new \App\ClientError(405);
                break;
        }
        parent::__construct($data);
    }


    private function name() 
    {
        if (!isset(\App\REQUEST::params()['name']))
        {
            throw new \App\ClientError(422);
        }
 
       $name = \App\REQUEST::params()['name'];
       return htmlspecialchars($name);
    }

    private function email() 
    {
        if (!isset(\App\REQUEST::params()['email']))
        {
            throw new \App\ClientError(422);
        }
 
       $email = REQUEST::params()['email'];
       return htmlspecialchars($email);
    }

    private function password() 
    {
        if (!isset(\App\REQUEST::params()['password']))
        {
            throw new \App\ClientError(422);
        }
 
       $password = \App\REQUEST::params()['password'];
       return htmlspecialchars($password);
    }
    
    private function addUser()
    { 
        $name = $this->name();
        $email = $this->email();
        $password = $this->password();
        $dbConn = new Database(USERS_DATABASE);

        $sqlParams = [':name' => $name, 'email' => $email,  'password' => $password];
        $sql = "INSERT INTO account (name, email, password) VALUES (:name, :email, :password)";

        $data = $dbConn->executeSQL($sql, $sqlParams);
        return [];
    }
}
