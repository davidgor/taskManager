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
	
	$data = json_decode(file_get_contents('php://input'), true);
	
	echo '{}';

	$stmt = $conn->prepare("UPDATE `task manager`.`Processes` SET `name`=?, `cmd`=?, `dir`=? WHERE `id`=?");
	$stmt->bind_param("sssi", $data["name"], $data["cmd"], $data["dir"], $data["id"]);
    $stmt->execute();
    
?>