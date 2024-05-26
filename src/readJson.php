<?php
header('Content-Type: application/json');
$jsonFile = "../Data/cargaisons.json";
$jsonData = file_get_contents($jsonFile);
$data = json_decode($jsonData, true);

echo json_decode($data);
