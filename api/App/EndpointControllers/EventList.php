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
        $sql = "SELECT event.eventID, event.name AS event_name, 
                COUNT(participantEvent.participantID) AS numberOfPa,
                GROUP_CONCAT(participant.name) AS participantsNames,
                GROUP_CONCAT(participant.email) AS email,
                GROUP_CONCAT(participant.phone) AS phone
                FROM event JOIN participantEvent ON participantEvent.eventID = event.eventID
                JOIN participant ON participant.participantID = participantEvent.participantID
                GROUP BY event.eventID, event.name";
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql);
        parent::__construct($data);
    }
    
    
}