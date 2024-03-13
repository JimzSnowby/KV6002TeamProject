<?php

namespace App;

/**
 * A class that provides methods to correctly format and output JSON,
 * as well as controlling access to the API.
 * 
 */
class Response
{
    public function __construct()
    {
        $this->outputHeaders();

        if(Request::method() === 'OPTIONS'){
            exit();
        }
    }
    
    private function outputHeaders()
    {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
        header('Access-Control-Allow-Headers: Authorization');
    }

    public function outputJSON($data)
    {
        echo json_encode($data);
    }

}
