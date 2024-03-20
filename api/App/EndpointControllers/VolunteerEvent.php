<?php

namespace App\EndpointControllers;

/**
 * 
 * An endpoint that returns account details for a volunteer.
 * 
 * @author James Sowerby
 * @studentID w21023500
 */
class VolunteerEvent extends Endpoint
{
    protected $allowedParams = ["volunteerid", "eventid"];

    private $sql = "SELECT 
                        volunteerEvent.volunteerID,
                        volunteerEvent.eventID,
                        event.name,
                        event.description,
                        event.date,
                        event.time,
                        event.location
                    FROM volunteerEvent
                    JOIN event ON volunteerEvent.eventID = event.eventID";

    private $sqlParams = [];

    public function __construct()
    {
        switch(\App\Request::method()) 
        {
            case 'GET':
                $this->checkAllowedParams();
                $this->getEvents();
                $dbConn = new \App\Database(MAIN_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            case 'POST':
                //$this->checkAllowedParams();
                $this->joinEvent();
                $dbConn = new \App\Database(MAIN_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            default:
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }

    private function getEvents()
    {
        if (!isset(\App\Request::params()['volunteerid'])) 
        {
            throw new \App\ClientError(422);
        }
        if (!is_numeric(\App\REQUEST::params()['volunteerid']) || !is_numeric(\App\Request::params()['eventid'])) {
            throw new \App\ClientError(422);
        }
        if (count(\App\Request::params()) > 2) {
            throw new \App\ClientError(422);
        }
        $this->sql .= " WHERE volunteerEvent.volunteerID = :volunteerid";
        $this->sqlParams[":volunteerid"] = \App\Request::params()['volunteerid'];
    }

    private function joinEvent()
    {
        $requiredParams = ["volunteerid", "eventid"];
        $allParamsSet = true;
        foreach($requiredParams as $param){
            if (!isset(\App\Request::params()[$param])){
                $allParamsSet = false;
                throw new \App\ClientError(400);
            }
        }

        if ($allParamsSet)
        {
            $this->sql = "INSERT INTO volunteerEvent (volunteerID, eventID) VALUES (:volunteerid, :eventid)";
            $this->sqlParams = [
                ":volunteerid" => \App\Request::params()["volunteerid"],
                ":eventid" => \App\Request::params()["eventid"]
            ];
        }
    }
}