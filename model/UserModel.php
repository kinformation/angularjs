<?php

$pdo = new PDO('mysql:dbname=angularjs', 'root', 'root');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
try {
  switch ($_GET['q']) {
  case 'check':
    $_mail = $_GET['mail'];
    $sql = "SELECT * "
          ."FROM USER "
          ."WHERE MAIL='$_mail' "
          ;
    $st = $pdo->query( $sql );
    if ($st->rowCount() > 0)
      echo '{"result":false}';
    else
      echo '{"result":true}';
    break;

  case 'regist':
    $in = json_decode(file_get_contents('php://input'), true);
    $st = $pdo->prepare("INSERT INTO USER(NAME, PASSWORD, MAIL, DELETE_FLG, CREATE_DATE, UPDATE_DATE)
                         VALUES(:name, :password, :mail, 0, NOW(), NOW() )");
    $st->execute($in);
    break;
  }
/*
  case 'update':
    $st = $pdo->prepare("UPDATE USER SET DELETE_FLG=1, UPDATE_DATE=NOW() WHERE ID=?");
    $st->execute([$_GET['ID']]);
    break;
  }
 */
} catch (PDOException $e) {
  echo sprintf('{"errorInfo":{"message":%s , "code":%s}}',
    json_encode($e->getMessage()), json_encode($e->getCode()) );
}
