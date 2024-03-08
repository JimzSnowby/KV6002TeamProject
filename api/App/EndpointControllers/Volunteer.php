<?php

namespace App\EndpointControllers;

/**
 * 
 * An endpoint that returns account details for a volunteer.
 * 
 * @author James Sowerby
 * @studentID w21023500
 */
class Volunteer extends Endpoint
{
    protected $allowedParams = ["page", "type"];

    private $sql = "SELECT volunteer.id, volunteer.name, volunteer.dob, volunteer.email, volunteer.phone
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
        if (isset(\App\Request::params()['type'])) 
        {
            if (count(\App\Request::params()) > 2) {
                throw new \App\ClientError(422);
            } 
            $this->sql .= " WHERE type.name = :type COLLATE NOCASE";
            $this->sqlParams[":type"] = \App\Request::params()['type'];
        }

        if (isset(\App\Request::params()['page'])) 
        {
            if (!is_numeric(\App\REQUEST::params()['page'])) {
                throw new \App\ClientError(422);
            }
            if (count(\App\Request::params()) > 2) {
                throw new \App\ClientError(422);
            } 
            if (\App\Request::params()['page'] == 1) {
                $this->sql .= " LIMIT 20";
            } elseif (\App\Request::params()['page'] > 1){
                $this->sql .= " LIMIT 20 OFFSET :offset";
                $this->sqlParams[":offset"] = (\App\Request::params()['page']) * 10;
            }
        }
    }
}