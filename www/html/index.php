<?php
use DI\Container;
use Slim\Factory\AppFactory;
use Slim\Views\Twig;

define('__HOME__', '/var/www');

require '/vendor/autoload.php';

$container = new Container();
AppFactory::setContainer($container);

$container->set(PDO::class, function () {
    $dsn = 'mysql:host=mysql;dbname=ha2gen;charset=utf8mb4';
    $username = 'test';
    $password = 'test';
    $options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
    return new PDO($dsn, $username, $password, $options);
});

$container->set(Twig::class, function () {
    $twig = Twig::create(__HOME__ . '/src/Views');
    return $twig;
});

$app = AppFactory::create();

// ルーティングミドルウェアのセットアップ
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

$app->get('/auth/signup', \App\Controllers\AuthController::class . ':signup');

$app->run();
