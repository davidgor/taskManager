<?php
	session_start();

	// connect to databace
	include 'db.php';

	// get login data
	$data = json_decode(file_get_contents('php://input'), true);
	$user = $data["userName"];
	$pass = $data["passwd"];

	// check user and get hasht password
	$stmt = $conn->prepare("SELECT paswd, id FROM `task manager`.users where username=?");
	$stmt->bind_param("s", $user);
	$stmt->execute();
	$stmt->bind_result($realPass, $id);
	if (!$stmt->fetch())
	{
		echo 0;
		exit();
	}

	//check the pasword
	if(password_verify($pass, $realPass))
	{
		$_SESSION["id"]   = $id;
		echo $id;
		exit();
	}

	echo 0;
        exit();
?>
