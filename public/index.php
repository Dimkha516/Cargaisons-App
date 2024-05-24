<?php
// http://localhost:8089/Cargaisons/public/index.php

$currentPage = isset($_GET["page"]) ? ($_GET["page"]) : 'home';
include_once "../pages/" .$currentPage . ".php";




// CORRIGER LINKS DE LA NAVBAR