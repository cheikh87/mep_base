<?php
error_reporting(0);
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd
include_once('config.php');

$id = $_POST['arg']; // on stocke le type dan sune ariable




    $sql = 'SELECT *from thematique';
    $req = $conn->prepare($sql);
    $req->execute();  



$result = $req->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);

?>