<?php

namespace App\EndpointControllers;

class Events extends Endpoint {

    private function name() 
    {
        if (!isset(REQUEST::params()['name']))
        {
            throw new ClientError(422);
        }
 
        if (mb_strlen(REQUEST::params()['name']) > 50)
        {
            throw new ClientError(402);
        }
 
       $event = REQUEST::params()['name'];
       return htmlspecialchars($name);
    }

    private function getEvent() { 

        $where = false; 
        $sql = "SELECT * name, description, date, time, location, space 
        FROM event";   
        //$sqlParameters = [':id' => $id];    

        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($this->sql, $this->sqlParams);

        return $data;
    }

    private function postEvent($id) {

        $eventID = REQUEST::params()['eventID'];
        $event = $this->event();
 
        $dbConn = new \App\Database(MAIN_DATABASE);
 
        $sqlParameters = ['eventID' => $eventID];
        $sql = "SELECT * FROM event WHERE eventID = :eventID";
        $data = $dbConn->executeSQL($sql, $sqlParameters);

        if (count($data) === 0) {
            $sql = "INSERT INTO event (eventID, name) VALUES ( :eventID, :name)";
        } else {
            $sql = "UPDATE event SET name = :name eventID = :eventID";
        }
 
        $sqlParameters = ['eventID' => $eventID, 'name' => $name];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
     
        return [];
    }

    private function deleteEvent() {
        if (!isset(REQUEST::params()['eventID']))
        {
            throw new ClientError(422);
        }
 
        $eventID = REQUEST::params()['eventID'];
        
        if (!is_numeric($eventID))
        {
            throw new ClientError(422);
        }
 
        $dbConn = new \App\Database(MAIN_DATABASE);
        $sql = "DELETE FROM event WHERE eventID = :eventID";
        $sqlParameters = ['eventID' => $eventID];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
        return $data;
    }



 }