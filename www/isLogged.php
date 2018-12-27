<?php
    session_start();

   // $_SESSION["user"] = "oki";
    if(isset($_SESSION["user"]))
    {
        echo 1;
    }
    else
    {
        echo 0;
    }
?>