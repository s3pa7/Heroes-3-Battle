<?php
require_once 'db_settings.php';

$getName = empty($_POST['login']) ? '' : $_POST['login'];
$getPass = empty($_POST['pass']) ? '' : $_POST['pass'];
$getEmail = empty($_POST['email']) ? '' : $_POST['email'];

$pdo = new PDO('mysql:host=localhost;dbname=heroes', DB_USER, "",[
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

//$query = 'INSERT INTO <TABLE> (name, value) VALUES ("' . $name. ', "' . $value . '")';
$people = [[$getName,$getEmail,$getPass]];
//array_push($people,"Qnko","abv@abv.bg","900227");
//var_dump($people);
$insertPersonSql = 'INSERT INTO people (name, email, password) VALUES (?,?, ?)';

$statement = $pdo->prepare($insertPersonSql);

$ids = [];
foreach ($people as $item) {

	$statement->execute($item);
	$ids[] = $pdo->lastInsertId();
}

//var_dump($ids);
if($ids[0] == "" && $ids[1] == "" && $ids[2] == ""){
	return;
}else {
	echo json_encode('Success');
}