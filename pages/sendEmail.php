<?php
require '/var/www/html/Cargaisons-App/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


function sendEmail($clientEmail, $destinataireEmail, $clientMessage, $recipientMessage)
{
    $mail = new PHPMailer(true);
    try {
        // Paramètres du serveur SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'dimkha516@gmail.com'; // Remplacez par votre adresse e-mail
        $mail->Password = 'ienu pqcm oxjg fuhd'; // Remplacez par votre mot de passe
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Destinataire pour le client
        $mail->setFrom('dimkha516@gmail.com', 'Sécure Transit');
        $mail->addAddress($clientEmail);

        // Contenu de l'e-mail pour le client
        $mail->isHTML(true);
        $mail->Subject = "Confirmation d'envoi de colis";
        $mail->Body = nl2br($clientMessage);

        $mail->send();

        // Destinataire pour le destinataire
        $mail->clearAddresses();
        $mail->addAddress($destinataireEmail);

        // Contenu de l'e-mail pour le destinataire
        $mail->Subject = "Notification de réception de colis";
        $mail->Body = nl2br($recipientMessage);

        $mail->send();

        return ["message" => "E-mails envoyés avec succès"];
    } catch (Exception $e) {
        return ["error" => "Erreur lors de l'envoi des e-mails: {$mail->ErrorInfo}"];
    }
}

header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);

if ($input) {
    $clientEmail = $input['clientEmail'] ?? null;
    $destinataireEmail = $input['destinataireEmail'] ?? null;
    $clientMessage = $input['clientMessage'] ?? null;
    $recipientMessage = $input['recipientMessage'] ?? null;

    if ($clientEmail && $destinataireEmail && $clientMessage && $recipientMessage) {
        $result = sendEmail($clientEmail, $destinataireEmail, $clientMessage, $recipientMessage);
        echo json_encode($result);
    } else {
        echo json_encode(["error" => "Données manquantes ou incorrectes"]);
    }
} else {
    echo json_encode(["error" => "Aucune donnée reçue"]);
}

/* 
require '/var/www/html/Cargaisons-App/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$clientEmail = $input['clientEmail'];
$destinataireEmail = $input['destinataireEmail'];
$clientMessage = $input['clientMessage'];
$recipientMessage = $input['recipientMessage'];

$mail = new PHPMailer(true);

try {
    // Paramètres du serveur SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'dimkha516@gmail.com'; // Remplacez par votre adresse e-mail
    $mail->Password = 'ienu pqcm oxjg fuhd'; // Remplacez par votre mot de passe
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Destinataire pour le client
    $mail->setFrom('dimkha516@gmail.com', 'GP du Monde');
    $mail->addAddress($clientEmail);

    // Contenu de l'e-mail pour le client
    $mail->isHTML(true);
    $mail->Subject = "Confirmation d'envoi de colis";
    $mail->Body = nl2br($clientMessage);

    $mail->send();

    // Destinataire pour le destinataire
    $mail->clearAddresses();
    $mail->addAddress($destinataireEmail);

    // Contenu de l'e-mail pour le destinataire
    $mail->Subject = "Notification de réception de colis";
    $mail->Body = nl2br($recipientMessage);

    $mail->send();

    echo json_encode(["message" => "E-mails envoyés avec succès"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de l'envoi des e-mails: {$mail->ErrorInfo}"]);
}
*/