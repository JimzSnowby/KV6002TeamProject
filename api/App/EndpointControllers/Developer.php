<?php

namespace App\EndpointControllers;

/**
 * An endpoint that returns my name and student id.
 * 
 */
class Developer extends Endpoint
{
    public function __construct()
    {
        $data['id'] = "w21023500";
        $data['name'] = "James Sowerby";
        parent::__construct($data);
    }
}