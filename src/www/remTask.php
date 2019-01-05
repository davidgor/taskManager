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
	
	echo '{}';

	// premision check
	if($_SESSION["id"]!=1 && $_SESSION["id"]!=$data["user"])
	{
		http_response_code(403);
		exit();
	}

	$stmt = $conn->prepare("DELETE FROM `task manager`.`Processes` WHERE `id`=?;");
	$stmt->bind_param("i", $data["id"]);
    $stmt->execute();
    
?>