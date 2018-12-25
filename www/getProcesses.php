<?php
	session_start();

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

	$stmt = $conn->prepare("SELECT * FROM `task manager`.Processes");
	$stmt->execute();
	$stmt->store_result();
	$count = 0;
	$first = true;

	$stmt->bind_result($id, $running, $state, $name, $cmd, $user);
	while($stmt->fetch())
	{
		if(!$first)
		{
			echo ",";
		}
		echo '"id'.$count.'": "'.$id.'",';
		echo '"run'.$count.'": "'.$running.'",';
		echo '"state'.$count.'": "'.$state.'",';
		echo '"name'.$count.'": "'.$name.'",';
		echo '"cmd'.$count.'": "'.$cmd.'",';
		echo '"user'.$count.'": "'.$user.'"';
		$count++;
		$first = false;
	}

	echo '}';
?>