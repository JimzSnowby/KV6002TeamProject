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

 class Sponsor extends Endpoint 
 {
     public function __construct(){
  
         switch(\App\Request::method()) 
         {
             case 'GET':
                $data = $this->getSponsor();
                 break;
             case 'POST':
                $data = $this->postSponsor();
                 break;
             case 'DELETE':
                $data = $this->deleteSponsor();
                 break;
             default:
                 throw new \App\ClientError(405);
                 
         }
         parent::__construct($data);
     }
     
     private function getSponsor(){
    
        $dbConn = new \App\Database(MAIN_DATABASE);
        
        $sql = "SELECT sponsor.email FROM sponsor ORDER BY email";
        $data = $dbConn->executeSQL($sql);

        return $data;
    }

    private function postSponsor() {

        if (!isset(\App\REQUEST::params()['email']))
        {
            throw new \App\ClientError(422);
        }

        $email = \App\Request::params()['email'];

        $dbConn = new \App\Database(MAIN_DATABASE);

        $sqlParams = [':email' => $email];
        $sql = "SELECT * FROM sponsor WHERE email = :email";
        $data = $dbConn->executeSQL($sql, $sqlParams);
 
 
        if (count($data) === 0) {
            $sql = "INSERT INTO sponsor (email) VALUES (:email)";
            $data = $dbConn->executeSQL($sql, $sqlParams);
        }
        
        return [];
 
    }

    private function deleteSponsor() {

        if (!isset(\App\REQUEST::params()['email'])) {

            throw new \App\ClientError(422);

        }

        $email = \App\Request::params()['email'];
 
        $dbConn = new \App\Database(MAIN_DATABASE);

        $sqlParams = [':email' => $email];
        $sql = "DELETE FROM sponsor WHERE email = :email";
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;

    }
 
}