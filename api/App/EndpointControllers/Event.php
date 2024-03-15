<?php

namespace App\EndpointControllers;

 /**
 * 
 *
 * @author Antonio Gorgan
 * This endpoint is used to create, view and delete events in the database 
 */ 

class Event extends Endpoint {

    
    public function __construct(){
//        $ths-> autoDeleteEvent();
        switch(\App\Request::method()) 
        {
            case 'GET':
                $data = $this->getEvent();
                break;
            case 'POST':
                $data = $this->postEvent();
                break;
            case 'DELETE':
                $data = $this->deleteEvent();
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
 
        if (mb_strlen(\App\REQUEST::params()['name']) > 50)
        {
            throw new \App\ClientError(402);
        }
 
       $name = \App\REQUEST::params()['name'];
       return htmlspecialchars($name);
    }

    private function description() 
    {
        if (!isset(\App\REQUEST::params()['description']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['description']) > 50)
        {
            throw new \App\ClientError(402);
        }
 
       $description = \App\REQUEST::params()['description'];
       return htmlspecialchars($description);
    }

    private function date() 
    {
        if (!isset(\App\REQUEST::params()['date']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['date']) > 50)
        {
            throw new \App\ClientError(402);
        }
 
       $date = \App\REQUEST::params()['date'];
       return htmlspecialchars($date);
    }

    private function time() 
    {
        if (!isset(\App\REQUEST::params()['time']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['time']) > 50)
        {
            throw new \App\ClientError(402);
        }
 
       $time = \App\REQUEST::params()['time'];
       return htmlspecialchars($time);
    }


    private function location() 
    {
        if (!isset(\App\REQUEST::params()['location']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['location']) > 50)
        {
            throw new \App\ClientError(402);
        }
 
       $location = \App\REQUEST::params()['location'];
       return htmlspecialchars($location);
    }

    private function space() 
    {
        if (!isset(\App\REQUEST::params()['space']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['space']) > 50)
        {
            throw new \App\ClientError(402);
        }
 
       $space = \App\REQUEST::params()['space'];
       return htmlspecialchars($space);
    }


    private function getEvent() { 
        $where = false; 
        $sql = "SELECT event.name, event.description, event.date, event.time, event.location, event.space 
        FROM event";   
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql);
        return $data;
    }

    private function postEvent($id) {

        $eventID = \App\REQUEST::params()['eventID'];
        $event = $this->event();
 
        $dbConn = new \App\Database(MAIN_DATABASE);
 
        $sqlParameters = ['eventID' => $eventID];
        $sql = "SELECT * FROM event WHERE eventID = :eventID";
        $data = $dbConn->executeSQL($sql, $sqlParameters);

        if (count($data) === 0) {
            $sql = "INSERT INTO event (eventID, name, description, date, time, location, space) VALUES ( :eventID, :name)";
        } else {
            $sql = "UPDATE event SET name = :name, eventID = :eventID";
        }
 
        $sqlParameters = ['eventID' => $eventID, 'name' => $name];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
     
        return [];
    }

    private function deleteEvent() {
        if (!isset(\App\REQUEST::params()['eventID']))
        {
            throw new \App\ClientError(422);
        }
 
        $eventID =\App\REQUEST::params()['eventID'];
        
        if (!is_numeric($eventID))
        {
            throw new \App\ClientError(422);
        }
 
        $dbConn = new \App\Database(MAIN_DATABASE);
        $sql = "DELETE FROM event WHERE eventID = :eventID";
        $sqlParameters = ['eventID' => $eventID];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
        return $data;
    }

   /* private function autoDeleteEvent() {
        $dbConn = new \App\Database(MAIN_DATABASE);
    
        // Calculate the date 5 days 
        $fiveDaysAgo = date('Y-m-d H:i:s', strtotime('-5 days'));
    
        // sql query to delete events older than 5 days
        $sql = "DELETE FROM event WHERE CONCAT(date, ' ', time) <= :fiveDaysAgo";
        $sqlParameters = ['fiveDaysAgo' => $fiveDaysAgo];
        $data = $dbConn->executeSQL($sql, $sqlParameters);
    
        return true; 
    }*/

 }