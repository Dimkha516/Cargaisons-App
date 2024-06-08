<?php
// http://localhost:8089/Cargaisons-App/public/index.php

$currentPage = isset($_GET["page"]) ? ($_GET["page"]) : 'login';
include_once "../pages/" .$currentPage . ".php";

//-----------MANQUANTS
// MAP


//
// Mettre carg fermée en cours:

//  Déclarer cargaison comme perdue => tous ces prod seront perdus.

//  Déclarer carg comme arrivée => Message au destinataire.

//  Déclarer produit d'une cargaison arrivée comme perdue.


//1: GÉNÉRER RECU ET L'ENVOYER AU DESTINATAIRE PAR MAIL LORS DE LA CRÉATION DE COLIS
//2: Envoyer un msg au destinataire avec le code du colis
//3: Archiver produit d'une cargaison arrivée 