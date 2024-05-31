<?php
// http://localhost:8089/Cargaisons-App/public/index.php

$currentPage = isset($_GET["page"]) ? ($_GET["page"]) : 'home';
include_once "../pages/" .$currentPage . ".php";


//-----------MANQUANTS
// MAP


//-------NOUVELLES FONCTIONALITÉS POUR LUNDI 03/05/2024😢
// Mettre carg fermée en cours:

//  Déclarer cargaison comme perdue => tous ces prod seront perdus.

//  Déclarer carg comme arrivée => Message au destinataire.

//  Déclarer produit d'une cargaison arrivée comme perdue.

 