<?php
// Vérifie si le fichier JSON existe
if (!file_exists('cargaisons.json')) {
    http_response_code(500);
    echo json_encode(["error" => "Le fichier datas.json est introuvable"]);
    exit;
}

// Lire le contenu du fichier JSON
$json_data = file_get_contents('datas.json');
$cargaisons = json_decode($json_data, true)["cargaisons"];

if ($cargaisons === null) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de la lecture du fichier JSON"]);
    exit;
}

// Retourner les données en JSON
header('Content-Type: application/json');
echo json_encode($cargaisons);
?>;
