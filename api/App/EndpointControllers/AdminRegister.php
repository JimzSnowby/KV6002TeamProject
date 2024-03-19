<?php
 namespace App\EndpointControllers;

 /**
  * Admin Endpoint
  *
  * This endpoint is incharge of handling get and post requests for the admin endpoint
  *
  * @author Pik Sum Siu
  */


class AdminRegister extends Endpoint 
{

    public function __construct()
    {

        switch(\App\Request::method()) 
        {
            case 'POST':
                $data = $this->addAdmin();
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
    
        if (mb_strlen(\App\REQUEST::params()['name']) > 250)
        {
            throw new \App\ClientError(422);
        }
    
        $name = \App\REQUEST::params()['name'];
        return htmlspecialchars($name);
    }

    private function dob() 
    {

    
        if (!isset(\App\REQUEST::params()['dob']))
        {
            throw new \App\ClientError(422);
        }
    
        $dob = \App\REQUEST::params()['dob'];
        return htmlspecialchars($dob);
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

    private function phone() 
    {

        if (!isset(\App\REQUEST::params()['phone']))
        {
            throw new \App\ClientError(422);
        }
 
       $phone = \App\REQUEST::params()['phone'];
       return htmlspecialchars($phone);
    }

    private function password() 
    {

        if (!isset(\App\REQUEST::params()['password']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['password']) > 250)
        {
            throw new \App\ClientError(422);
        }
 
       $password = \App\REQUEST::params()['password'];
       return htmlspecialchars($password);
    }

    private function position() 
    {

        if (!isset(\App\REQUEST::params()['position']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['position']) > 30)
        {
            throw new \App\ClientError(422);
        }
 
       $position = \App\REQUEST::params()['position'];
       return htmlspecialchars($position);
    }

    private function addAdmin()
    {
        $name = $this->name();
        $dob = $this->dob();
        $email = $this->email();
        $phone = $this->phone();
        $password = $this->password(); 
        $position = $this->position();
        
        $dbConn = new \App\Database(MAIN_DATABASE);
       
        $sqlParams = [
                    ':name' => $name, 
                    ':dob' => $dob, 
                    ':email' => $email, 
                    ':phone' => $phone,
                    ':password' => $password,
                    ':position' => $position
                ];

        // Check if the user already exists
        if ($this->userExists($email)) {
            throw new \App\ClientError(409); 
        }

        // Insert the user into the database
        $sql = "INSERT INTO admin (
            name,
            dob,
            email,
            phone,
            password,
            position
        ) VALUES (
            :name, 
            :dob,
            :email,
            :phone,
            :password,
            :position
        )";
        $data = $dbConn->executeSQL($sql, $sqlParams);

    
        return [];
    }
    private function userExists($email)
{
    $dbConn = new \App\Database(MAIN_DATABASE);
    $sql = "SELECT * FROM admin WHERE email = :email";
    $sqlParams = [':email' => $email];
    $data = $dbConn->executeSQL($sql, $sqlParams);

    return !empty($data);
}

 
    
     
    }
 