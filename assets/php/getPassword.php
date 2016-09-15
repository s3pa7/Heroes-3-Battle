<?php

require_once 'db_settings.php';

$getEmail = empty($_POST['email']) ? '' : $_POST['email'];

$pdo = new PDO('mysql:host=localhost;dbname=heroes', DB_USER, DB_PASS, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$sth = $pdo->prepare("SELECT * FROM people WHERE email = '$getEmail'");
$sth->execute();

$result = $sth->fetchAll(PDO::FETCH_ASSOC);
if($result == []){
	return;
}else {
	echo json_encode($result);
}
