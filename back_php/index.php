<?php

//To launch: php -S localhost:5000 server.php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Exception\NotFoundException;

require __DIR__ . '/vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;

$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response) {
  $response->getBody()->write(file_get_contents(__DIR__ . '/../front/views/index.html'));
    return $response;
});


$app->get('/{type}/{file}', function (Request $request, Response $response, $args) {
    $filePath = __DIR__ . '/../front/'.$args["type"].'/' . $args['file'];

    if (!file_exists($filePath)) {
        return $response->withStatus(404, 'File Not Found');
    }

    switch (pathinfo($filePath, PATHINFO_EXTENSION)) {
        case 'css':
            $mimeType = 'text/css';
            break;

        case 'js':
            $mimeType = 'application/javascript';
            break;
            case 'svg':
            $mimeType = 'image/svg+xml';
            break;
             case 'png':
            $mimeType = 'image/png';
            break;

        // Add more supported mime types per file extension as you need here

        default:
            $mimeType = 'text/html';
    }

    $newResponse = $response->withHeader('Content-Type', $mimeType . '; charset=UTF-8');

    $newResponse->getBody()->write(file_get_contents($filePath));

    return $newResponse;
});

    //code...
    $app->run();

