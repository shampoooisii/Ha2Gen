# Slim4の使い方

## 基本形
サンプルコード
```php
use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require '/vendor/autoload.php';

$app = AppFactory::create();

$app->get('/', function ($request, $response, $args) {
    $response->getBody()->write('Hello, world!');
    return $response;
});

$app->run();
```

### 解説
- `use`で名前空間を指定している
    - Pythonでいう`import`と同じ
- `require`で`vendor`ディレクトリにある`autoload.php`を読み込んでいる
    - `vendor`ディレクトリはComposerでインストールしたパッケージが入っている
- `AppFactory::create()`で`Slim\App`のインスタンスを生成している
    - `AppFactory`は`Slim\Factory`名前空間にあるクラス
- `$app->get()`でルーティングを設定している
    - 第一引数にパス、第二引数にクロージャを指定している
    - クロージャの引数には`Request`、`Response`、`$args`を指定している
    - `Request`はリクエスト情報を扱うためのクラス
    - `Response`はレスポンス情報を扱うためのクラス
    - `$args`はルーティングパラメータを扱うための配列
- `$response->getBody()->write()`でレスポンスのボディに文字列を書き込んでいる
    - `getBody()`で`Response`のボディを取得している
    - `write()`で文字列を書き込んでいる
- `return $response`でレスポンスを返している
- `$app->run()`でアプリケーションを実行している
    - ルーティングにマッチする処理があればそれを実行する


## ルーティング
Slim4では、$app->get()、$app->post()、$app->put()、$app->patch()、$app->delete()などのメソッドを使用して、ルーティングを設定します。以下はそれぞれのメソッドの基本的な使い方です。

### リクエストメソッド
- GET: リソースの取得に使用されます。主にデータの読み取りに利用されます。
- POST: リソースの作成や処理の実行に使用されます。主にデータの送信や作成に利用されます。
- PUT: リソースの更新に使用されます。指定されたリソースを更新するために使用されます。
- PATCH: リソースの部分的な更新に使用されます。一部の情報のみを更新する場合に使用されます。
- DELETE: リソースの削除に使用されます。指定されたリソースを削除するために使用されます。

### データの受け取り方
- パスパラメータ
    - パスの一部に含まれる値を取得する
    - 例: /users/{id}

```php
$app->get('/users/{id}', function ($request, $response, $args) {
    $id = $args['id'];
    $response->getBody()->write("id: $id");
    return $response;
});
```

- クエリパラメータ
    - URLのクエリパラメータから値を取得する
    - 例: /users?id=1

```php
//
$app->get('/users', function ($request, $response, $args) {
    $id = $request->getQueryParams()['id'];
    $response->getBody()->write("id: $id");
    return $response;
});
```

- リクエストボディ
    - リクエストボディから値を取得する
    - 例: POST /users { "name": "John" }

```php
$app->post('/users', function ($request, $response, $args) {
    $data = $request->getParsedBody();
    $name = $data['name'];
    $response->getBody()->write("name: $name");
    return $response;
});
```

- 組み合わせも可能
    - パスパラメータとクエリパラメータを組み合わせて使用することも可能です。
    - 例: /users/{id}?name=John

```php
$app->get('/users/{id}', function ($request, $response, $args) {
    $id = $args['id'];
    $name = $request->getQueryParams()['name'];
    $response->getBody()->write("id: $id, name: $name");
    return $response;
});
```

## レスポンス
Slim4では、Response インスタンスを使用して、HTTPレスポンスを生成および送信します。以下は基本的なテキスト、Twig、JSONレスポンスの例です。

### テキストレスポンス
基本的なテキストレスポンスの例です。
```php
$app->get('/text', function ($request, $response, $args) {
    $response->getBody()->write('Hello, world!');
    return $response;
});
```

### Twigレスポンス
Twigを使用してHTMLをレンダリングする例です。
Twigを使用するには、`slim/twig-view`パッケージをインストールする必要があります。
```php
$app->get('/twig', function ($request, $response, $args) {
    $view = Twig::create('/path/to/templates');
    $response = $view->render($response, 'index.twig', ['name' => 'John']);
    return $response;
});
```

#### Twigの使い方
基本はHTMLと書き方は一緒です。
`Twig::create()`でTwigインスタンスを生成し、`$view->render()`でテンプレートをレンダリングします。
`{{ }}`を使い、変数を埋め込むことができます。
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Webpage</title>
</head>
<body>
    <p>Hello, {{ name }}</p>
</body>
```

### JSONレスポンス
JSONレスポンスを返す例です。
```php
$app->get('/json', function ($request, $response, $args) {
    $data = ['name' => 'John', 'age' => 30];
    $response->getBody()->write(json_encode($data));
    return $response->withHeader('Content-Type', 'application/json');
});
```

## MVCモデル
Slim4では、MVC（Model-View-Controller）モデルを使用してアプリケーションを構築することで、コードの再利用性を高めることができます。以下はMVCモデルの基本的な使い方です。

### MVCモデルとは
MVCモデルは、アプリケーションを3つの部分に分割する設計パターンです。
- Model: データベースやファイルなどのデータを扱う部分
- View: ユーザーに表示される部分
- Controller: ユーザーからのリクエストを受け取り、ModelとViewを制御する部分

本システムではここに`Service`, `Middleware`を追加しています。
- Service: ビジネスロジックを実装する部分
- Middleware: リクエストとレスポンスの間に挟む処理を実装する部分

### ディレクトリ構造
本システムでは以下のディレクトリ構造を採用しています。
```bash
www/src
├── Controllers
├── Handlers
├── Middleware
├── Models
├── Services
└── Views
```

### MVCの使い方
本システムではpsr-4を使用して、名前空間とディレクトリを紐づけています。
`composer.json`
```json
{
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    }
}
```
これをすることで、名前空間`App`を使用して、`src`ディレクトリ以下のクラスを読み込むことができます。

### MVCを使用した例
以下はMVCモデルを使用した例です。
`index.php`
```php
use Slim\Factory\AppFactory;

require '/vendor/autoload.php';

$app = AppFactory::create();

$app->get('/users', App\Controllers\UserController::class . ':index');

$app->run();
```

`UserController.php`
```php
namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserController
{
    public function index(Request $request, Response $response, $args)
    {
        $response->getBody()->write('Hello, world!');
        return $response;
    }
}
```

## DIコンテナを使用したDB接続
Slim4では、DIコンテナを使用して、依存関係を解決することができます。以下はDIコンテナを使用して、DB接続を行う例です。

`index.php`
```php
use Slim\Factory\AppFactory;
use DI\Container;

require '/vendor/autoload.php';

$container = new Container();
AppFactory::setContainer($container);

$container->set(PDO::class, function () {
    $dsn = 'mysql:host=your_host;dbname=your_dbname;charset=utf8';
    $username = 'your_username';
    $password = 'your_password';
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];
    return new PDO($dsn, $username, $password, $options);
});

$app = AppFactory::create();

// 処理...
```

`UserController.php`
```php
namespace App\Controllers;

use App\Models\UserModel;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserController {
    protected $model;

    public function __construct(UserModel $model) {
        $this->model = $model;
    }

    public function index(Request $request, Response $response, $args): Response {
        // 処理...
        return $response;
    }
}
```

`UserModel.php`
```php
namespace App\Models;

use PDO;

class UserModel {
    protected $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getAll(): array {
        // 処理...
    }
}
```



