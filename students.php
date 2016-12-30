<?php
$pdo = new PDO('mysql:dbname=angularjs', 'root', 'root');
switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $st = $pdo->query("SELECT * FROM USER WHERE DELETE_FLG = 0");
    echo json_encode($st->fetchAll(PDO::FETCH_ASSOC));
    break;
  case 'POST':
    $in = json_decode(file_get_contents('php://input'), true);
    if (isset($in['ID'])) {
      $st = $pdo->prepare("UPDATE USER SET NAME=:NAME, PASSWORD=:PASSWORD, MAIL=:MAIL, UPDATE_DATE=NOW() WHERE ID=:ID");
    } else {
      $st = $pdo->prepare("INSERT INTO USER(NAME, PASSWORD, MAIL, DELETE_FLG, CREATE_DATE, UPDATE_DATE) VALUES(:NAME, :PASSWORD, :MAIL, 0, NOW(), NOW() )");
    }
    $st->execute($in);
    break;
  case 'DELETE':
    $st = $pdo->prepare("UPDATE USER SET DELETE_FLG=1, UPDATE_DATE=NOW() WHERE ID=?");
//    $st = $pdo->prepare("DELETE FROM USER WHERE ID=?");
    $st->execute([$_GET['ID']]);
    break;
}
