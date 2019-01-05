<?php
    session_start();

   // $_SESSION["user"] = "oki";
    if(isset($_SESSION["id"]))
    {
        echo $_SESSION["id"];
    }
    else
    {
        echo 0;
    }
?>