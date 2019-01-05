<?php
    // server login data
    $serverADDR = "localhost";
    $userName   = "david";
    $password   = "86942a";


    // start db
    $conn = new mysqli($serverADDR, $userName, $password, "task manager");
    if ($conn->connect_error)
    {
        http_response_code(500);
        exit();
    }
?>