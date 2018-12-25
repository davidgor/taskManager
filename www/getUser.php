<?php
	session_start();

    // check if logged in
    if(!isset($_SESSION["user"]))
    {
		http_response_code(500);
		exit();
    }

	// connect to databace
	$conn = new mysqli("localhost", "david", "86942a", "task manager");
	if ($conn->connect_error)
	{
	    http_response_code(500);
		exit();
    }
	
	echo '{';

	$stmt = $conn->prepare("SELECT ID, username FROM `task manager`.users");
	$stmt->execute();
	$stmt->store_result();
	$count = 0;
	$first = true;

	$stmt->bind_result($id, $user);
	while($stmt->fetch())
	{
		if(!$first)
		{
			echo ",";
		}
		echo '"id'.$count.'": "'.$id.'",';
		echo '"user'.$count.'": "'.$user.'"';
		$count++;
		$first = false;
	}

	echo '}';
?>