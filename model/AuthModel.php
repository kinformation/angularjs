<?php
$pdo = new PDO('mysql:dbname=angularjs', 'root', 'root');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
  switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $query = sprintf( "SELECT * FROM USER WHERE DELETE_FLG=0 AND MAIL='%s' AND PASSWORD='%s'",
                      $_GET['mail'], $_GET['password'] );
    $st = $pdo->prepare( $query );
    $st->execute();
    echo json_encode($st->fetchAll(PDO::FETCH_ASSOC));
    break;

  case 'POST':
    $in = json_decode(file_get_contents('php://input'), true);
    $st = $pdo->prepare("INSERT INTO USER(NAME, PASSWORD, MAIL, DELETE_FLG, CREATE_DATE, UPDATE_DATE)
                         VALUES(:name, :password, :mail, 0, NOW(), NOW() )");
    $st->execute($in);
    break;

  case 'DELETE':
    $st = $pdo->prepare("UPDATE USER SET DELETE_FLG=1, UPDATE_DATE=NOW() WHERE ID=?");
    $st->execute([$_GET['ID']]);
    break;
  }
} catch (PDOException $e) {
  echo sprintf('{"errorInfo":{"message":%s , "code":%s}}',
               json_encode($e->getMessage()), json_encode($e->getCode()) );
}
