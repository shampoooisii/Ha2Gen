<?php
namespace App\Models\Abstract;

use PDO;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Exception\HttpInternalServerErrorException;

abstract class BaseModel
{
    protected $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function withTransaction(callable $operation, Request $request)
    {
        try {
            $this->pdo->beginTransaction();
            $operation();
            $this->pdo->commit();
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new HttpInternalServerErrorException($request, null, $e);
        }
    }
}
