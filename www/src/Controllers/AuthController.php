<?php
namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Views\Twig;
use App\Models\AuthModel;

class AuthController
{
    private $model;
    private $view;

    public function __construct(AuthModel $model, Twig $view)
    {
        $this->model = $model;
        $this->view = $view;
    }

    public function signup(Request $request, Response $response, $args)
    {
        // get通信なら、signup.twigを表示
        if ($request->getMethod() === 'GET') {
            return $this->view->render($response, 'signup.twig');
        }

        $this->model->withTransaction(function () use ($request) {
            // ここにトランザクション処理を記述
        }, $request);

        $response->getBody()->write('Hello World');
        return $response;
    }
}
