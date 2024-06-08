<?php

session_start();
$_SESSION['emailPass-error'] = '';
$_SESSION['email-error'] = '';
$_SESSION['pass-error'] = '';
 
function validLogin($email, $password)
{
    $adminFile = file_get_contents("../Data/users.json");
    $adminFileArray = json_decode($adminFile, true);
    

    $emailPassErrorMessage = "Email et mot de passe recquis";
    $emailErrorMessage = "Email Invalide";
    $passErrorMessage = "Mot de passe incorrect";

    if ($email == null && $password == null) {
        if (isset($_SESSION['emailPass-error'])) {
            $_SESSION['emailPass-error'] = $emailPassErrorMessage;
        }
    }
    // 
    else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        if (isset($_SESSION['email-error'])) {
            $_SESSION['email-error'] = $emailErrorMessage;
        }
    } 
    // 
    else if (strlen($password) != 4) {
        if (isset($_SESSION['pass-error'])) {
            $_SESSION['pass-error'] = $passErrorMessage;
        }
    }

    else{
        $userInfos = [
            "email" => $email,
            "pass" => $password,
        ];
        $foundedAdmin = null;
        
        foreach($adminFileArray as $admin){
            if($admin['email'] == $userInfos['email'] && $admin['pass'] == $userInfos['pass']){
                $foundedAdmin = $admin;

                $_SESSION['connected_admin'] = $foundedAdmin;
                $_SESSION['emailPass-error'] = "";
                $_SESSION['$email-error'] = "";
                $_SESSION['pass-error'] = "";
                header('Refresh:1; url=../public/index.php?page=home');
                break;
            }
            
            else{
                $_SESSION['emailPass-error'] = "Utilisateur inconnu !";
            }
        }
    
    }
}