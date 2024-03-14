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
                       COUNT(volunteerEvent.volunteerID) AS volunteerNum,
                       GROUP_CONCAT(participant.name) AS volunteerName
                FROM event
                LEFT JOIN participantEvent ON event.eventID = participantEvent.eventID
                LEFT JOIN participant ON participant.participantID = participantEvent.participantID
                GROUP BY event.eventID, event.name";
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql);
        parent::__construct($data);
    }
    
    
}