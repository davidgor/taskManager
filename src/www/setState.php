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

    if($data["targetState"]=="true")
        $stmt = $conn->prepare("UPDATE `task manager`.`Processes` SET `setState`=b'1' WHERE `id`=?;");
    else
		$stmt = $conn->prepare("UPDATE `task manager`.`Processes` SET `setState`=b'0' WHERE `id`=?;");
	$stmt->bind_param("i", $data["id"]);
    $stmt->execute();
?>