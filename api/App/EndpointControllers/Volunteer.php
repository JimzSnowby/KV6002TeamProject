<?php

namespace App\EndpointControllers;

/**
 * 
 * An endpoint that returns account details for a volunteer.
 * 
 */
class Volunteer extends Endpoint
{
    protected $allowedParams = ["name"];

    private $sql = "SELECT volunteer.volunteerID, volunteer.name, volunteer.dob, volunteer.email, volunteer.phone
                    FROM volunteer";

    private $sqlParams = [];

    public function __construct()
    {
        switch(\App\Request::method()) 
        {
            case 'GET':
                $this->checkAllowedParams();
                $this->buildSQL();
                $dbConn = new \App\Database(MAIN_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
                break;
            default:
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }

    private function buildSQL()
    {
        if (isset(\App\Request::params()['name'])) 
        {
            if (count(\App\Request::params()) > 2) {
                throw new \App\ClientError(422);
            } 
            $this->sql .= " WHERE volunteer.name = :name COLLATE NOCASE";
            $this->sqlParams[":name"] = \App\Request::params()['name'];
        }
    }
}