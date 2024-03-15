<?php

namespace App\EndpointControllers;

 /**
 * 
 *
 * @author Antonio Gorgan
 * This endpoint is used to retrieve participants name and numbers for each event 
 */ 

class EventList extends Endpoint
{
    public function __construct() {
        $sql = "SELECT event.eventID, 
                       event.name AS event_name, 
                       COUNT(participantEvent.participantID) AS participantNum,
                       GROUP_CONCAT(participant.name) AS participantName
                FROM event
                LEFT JOIN participantEvent ON participantEvent.eventID = event.eventID
                LEFT JOIN participant ON participant.participantID = participantEvent.participantID
                GROUP BY event.eventID, event.name";
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql);
        parent::__construct($data);
    }
    
    
}