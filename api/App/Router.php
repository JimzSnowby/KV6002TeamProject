<?php

namespace App;

/**
 * An abstract class that handles routing requests to the correct endpoint controller.
 * Throws a 404 error if the endpoint is not found.
 * 
 * @author James Sowerby
 * @studentID w21023500
 */
abstract class Router
{
    public static function routeRequest()
    {
        $requestedEndpoint = strtolower(Request::endpointName());
        try
        {
            switch ($requestedEndpoint) {
                case '':
                case '/developer':
                case '/developer/':
                    $endpoint = new EndpointControllers\Developer();
                    break;
                case '/content':
                case '/content/':
                    $endpoint = new EndpointControllers\Content();
                    break;
                case '/token':
                case '/token/':
                    $endpoint = new EndpointControllers\Token();
                    break;
                    break;
                default:
                    throw new ClientError(404);
            }
        } catch (ClientError $e) {
            $data = ['message' => $e->getMessage()];
            $endpoint = new EndpointControllers\Endpoint($data);
        }
        return $endpoint;
    }
}