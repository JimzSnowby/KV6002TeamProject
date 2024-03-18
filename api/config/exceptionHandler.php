<?php

/**
 * An exception handler that outputs a JSON message
 * when an error occurs.
 * 
 * @author James Sowerby w21023500
 */

function exceptionHandler($e) {
    http_response_code(500);
    $output['message'] = "Internal Server Error";
    $output['details']['exception'] = $e->getMessage();
    $output['details']['file'] = $e->getFile();
    $output['details']['line'] = $e->getLine();
    echo json_encode($output);
    exit();
}