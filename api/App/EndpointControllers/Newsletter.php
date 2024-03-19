<?php

namespace App\EndpointControllers;
/**
 * Save content to authenticated users
 *
 * This class will save contents for authenticated users. 
 * It handles GET, POST and DELETE requests.
 *
 * @author Pik Sum Siu
 */

 class Newsletter extends Endpoint 
 {
    protected $allowedParams = ["email"];
     public function __construct(){
  
         switch(\App\Request::method()) 
         {
             case 'GET':
                $data = $this->getNewsletter();
                 break;
             case 'POST':
                $data = $this->addNewsletter();
                 break;
             case 'DELETE':
                $data = $this->deleteNewsletter();
                 break;
             default:
                 throw new \App\ClientError(405);
                 
         }
         parent::__construct($data);
     }

     private function getNewsletter(){

        $dbConn = new \App\Database(MAIN_DATABASE);

        $sql = "SELECT newsletter.email FROM newsletter ORDER BY email";
        $data = $dbConn->executeSQL($sql);

        return $data;

    }

    private function addNewsletter()
    {
        if (!isset(\App\REQUEST::params()['email']))
        {
            throw new \App\ClientError(422);
        }
         
        $email = \App\Request::params()['email'];

        $dbConn = new \App\Database(MAIN_DATABASE);

        $sqlParams = [':email' => $email];
        $sql = "SELECT * FROM newsletter WHERE email = :email";
        $data = $dbConn->executeSQL($sql, $sqlParams);
 
 
        if (count($data) === 0) {
            $sql = "INSERT INTO newsletter (email) VALUES (:email)";
            $data = $dbConn->executeSQL($sql, $sqlParams);
        }
        return [];
 
 
    }
    private function deleteNewsletter() {

        if (!isset(\App\REQUEST::params()['email']))
        {
            throw new \App\ClientError(422);
        }
         
        $email = \App\Request::params()['email'];
 
        $dbConn = new \App\Database(MAIN_DATABASE);

        $sqlParams = [':email' => $email];
        $sql = "DELETE FROM newsletter WHERE email = :email";
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;

    }
 
}
