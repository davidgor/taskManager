<?php
	session_start();

    // check if logged in
    if(!isset($_SESSION["id"]))
    {
		http_response_code(403);
		exit();
    }

	// connect to databace
	include "db.php";
	
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