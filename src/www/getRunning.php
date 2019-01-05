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
	
	$data = json_decode(file_get_contents('php://input'), true);
	
	echo '{';

	$stmt = $conn->prepare("SELECT id,running FROM `task manager`.Processes where parrent=?");
    $stmt->bind_param("i", $data["id"]);
    $stmt->execute();
	$stmt->store_result();
	$count = 0;
	$first = true;

	$stmt->bind_result($id, $running);
	while($stmt->fetch())
	{
		if(!$first)
		{
			echo ",";
		}
		echo '"id'.$count.'": "'.$id.'",';
		echo '"run'.$count.'": "'.$running.'"';
		$count++;
		$first = false;
	}

	echo '}';
?>