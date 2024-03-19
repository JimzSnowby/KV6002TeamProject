<?php

namespace App\EndpointControllers;
 /**
 * 
 *
 * @author Antonio Gorgan
 * This endpoint is used to create a waiting list for each event
 */

class WaitingList extends Endpoint
{
    public function __construct() {
        $sql = "SELECT event.eventID, 
                       event.name AS event_name, 
                       COUNT(waitingList.participantID) AS waitingNum,
                       GROUP_CONCAT(participant.name) AS waitingParticipantName
                FROM event
                LEFT JOIN waitingList ON event.eventID = waitingList.eventID
                LEFT JOIN participant ON participant.participantID = waitingList.participantID
                GROUP BY event.eventID, event.name";
        $dbConn = new \App\Database(MAIN_DATABASE);
        $data = $dbConn->executeSQL($sql);
        parent::__construct($data);
    }  
    
}