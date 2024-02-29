<?php

/**
 * The main entry point for the API.
 * 
 * @author James Sowerby
 * @studentID w21023500
 */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "config/settings.php";
include "config/autoloader.php";
include "config/exceptionHandler.php";

set_exception_handler('exceptionHandler');
spl_autoload_register("autoloader");

$response = new App\Response();
$endpoint = App\Router::routeRequest();
$data = $endpoint->getData();

$response->outputJSON($data);
