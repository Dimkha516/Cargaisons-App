<?php
$json_file = "../Data/cargaisons.json";

if (!file_exists($jsonFile)) {
    http_response_code(404);
    echo json_encode(["error" => "File not found"]);
    exit();
}

$jsonData = file_get_contents($json_file);

if($json_data === false){
    http_response_code(500);
    echo json_encode(["error" => "Error reading the file"]);
    exit();
}

$data = json_decode($json_data, true);
if(json_last_error() !== JSON_ERROR_NONE){
    http_response_code(500);
    echo json_encode(["error" => "Invalid JSON format"]);
    exit();
}


header('Content-Type: application/json');
echo json_decode($data);
