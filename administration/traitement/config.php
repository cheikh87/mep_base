<?php
$host = 'localhost';
$dbname = 'gestion_activites_cse';
$dbuser = 'postgres';
$dbpass = 'postgres';

try{
    $conn = new PDO("pgsql:dbname=$dbname;host=$host", $dbuser, $dbpass);
}
catch (Exception   $e){echo json_encode(array("retour"=>'Erreur de connexion à la bdd', "e" => $e )); die();}
?>