<?php

require_once 'db_settings.php';

$getName = empty($_POST['login']) ? '' : $_POST['login'];
$getPass = empty($_POST['pass']) ? '' : $_POST['pass'];

$pdo = new PDO('mysql:host=localhost;dbname=heroes', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$sth = $pdo->prepare("SELECT * FROM people WHERE name = '$getName' AND password = '$getPass'");
$sth->execute();

$result = $sth->fetchAll(PDO::FETCH_ASSOC);
if($result == []){
	return;
}else {
	echo json_encode($result);
}
