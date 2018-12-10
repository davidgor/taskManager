<?php
	session_start();

	// connect to databace
	$conn = new mysqli("localhost", "david", "86942a", "task manager");
	if ($conn->connect_error)
	{
	    http_response_code(500);
	}

	// get login data
	$data = json_decode(file_get_contents('php://input'), true);
	$user = $data["userName"];
	$pass = $data["passwd"];

	// check user and get hasht password
	$stmt = $conn->prepare("SELECT paswd FROM `task manager`.users where username=?");
	$stmt->bind_param("s", $user);
	$stmt->execute();
    	$stmt->bind_result($realPass);
	if (!$stmt->fetch())
	{
		echo 0;
		exit();
	}

	//check the pasword
	if(password_verify($pass, $realPass))
	{
		$_SESSION["user"] = $user;
		echo 1;
		exit();
	}

	echo 0;
        exit();
?>
