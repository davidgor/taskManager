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

	// premision check
	if($_SESSION["id"]!=1 && $_SESSION["id"]!=$data["user"])
	{
		http_response_code(500);
		exit();
	}
	
	$data = json_decode(file_get_contents('php://input'), true);
	
	echo '{}';

	$stmt = $conn->prepare("UPDATE `task manager`.`Processes` SET `name`=?, `cmd`=?, `dir`=? WHERE `id`=?");
	$stmt->bind_param("sssi", $data["name"], $data["cmd"], $data["dir"], $data["id"]);
    $stmt->execute();
    
?>