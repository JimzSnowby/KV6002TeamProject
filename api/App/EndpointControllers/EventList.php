<?php

namespace App\EndpointControllers;
 /**
 * 
 *
 * @author Antonio Gorgan
 *
 */

class EventList extends Endpoint
{
    public function __construct() {
        $sql = "SELECT event.eventID, 
                       event.name AS event_name, 
                       COUNT(participantEvent.participantID) AS num_participants,
                       GROUP_CONCAT(participant.name) AS participant_names
                FROM event
                LEFT JOIN participantEvent ON event.eventID = participantEvent.eventID
                LEFT JOIN participant ON participant.participantID = participantEvent.participantID
                GROUP BY event.eventID, event.name";
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql);
        parent::__construct($data);
    }
    
    
}