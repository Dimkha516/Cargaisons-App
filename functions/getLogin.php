<?php

include_once("loginValidation.php");

if($_SERVER['REQUEST_METHOD'] == "POST"){
    $email = $_POST['adminEmail'];
    $password = $_POST['adminPassword'];

    validLogin($email, $password);
};
