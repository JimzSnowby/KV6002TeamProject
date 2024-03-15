<?php
/**
 * Register Endpoint
 *
 * This PHP class represents an endpoint for user registration and retrieval of user data.
 * It allows users to register by providing their name, email, and password.
 *
 * @author Maja Bosy
 */
namespace App\EndpointControllers;

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
            throw new \App\ClientError(444);
        }
 
       $name = \App\REQUEST::params()['name'];
       return htmlspecialchars($name);
    }

    private function dob() 
    {
        if (!isset(\App\REQUEST::params()['dob']))
        {
            throw new \App\ClientError(445);
        }
 
       $dob = \App\REQUEST::params()['dob'];
       return htmlspecialchars($dob);
    }

    private function email() 
    {
        if (!isset(\App\REQUEST::params()['email']))
        {
            throw new \App\ClientError(446);
        }
 
       $email = \App\REQUEST::params()['email'];
       return htmlspecialchars($email);
    }

    private function phone() 
    {
        if (!isset(\App\REQUEST::params()['phone']))
        {
            throw new \App\ClientError(447);
        }
 
       $phone = \App\REQUEST::params()['phone'];
       return htmlspecialchars($phone);
    }

    private function password() 
    {
        if (!isset(\App\REQUEST::params()['password']))
        {
            throw new \App\ClientError(448);
        }
 
       $password = \App\REQUEST::params()['password'];
       return htmlspecialchars($password);
    }

    private function ticket() 
    {
        if (!isset(\App\REQUEST::params()['ticket']))
        {
            throw new \App\ClientError(449);
        }
 
       $ticket = \App\REQUEST::params()['ticket'];
       return htmlspecialchars($ticket);
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
    
    private function addUser()
    { 
        $name = $this->name();
        $dob = $this->dob();
        $email = $this->email();
        $phone = $this->phone();
        $password = $this->password();
        $ticket = $this->ticket();
        $dbConn = new \App\Database(MAIN_DATABASE);

        // Check if file was uploaded successfully
        if(isset($_FILES['evidence']) && $_FILES['evidence']['error'] === UPLOAD_ERR_OK) {
            // Read the file content
            $evidenceContent = file_get_contents($_FILES['evidence']['tmp_name']);
        } else {
            throw new \App\ClientError(450); // File upload error
        }
        // Prepare SQL query with parameters
        $sql = "INSERT INTO participant (name, dob, email, phone, password, evidence, ticket) VALUES (:name, :dob, :email, :phone, :password, :evidence, :ticket)";
        $sqlParams = [
            ':name' => $name,
            ':dob' => $dob,
            ':email' => $email,
            ':phone' => $phone,
            ':password' => $password,
            ':evidence' => $evidenceContent, // Use the content of the evidence file
            ':ticket' => $ticket
        ];
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return [];
    }
}