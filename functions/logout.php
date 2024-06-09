<?php
function logout() {
    session_unset();
    session_destroy();
    header("Location: ../public/index.php?page=login");
}

if($_SERVER['REQUEST_METHOD']=='POST'){
    if(isset($_POST['logout'])){
        logout();
    }
}
