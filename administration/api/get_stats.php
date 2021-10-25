<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd






    $sql = 'select count(*),id_thematique from elements_thematique group by id_thematique';
    $req = $conn->prepare($sql);
    $req->execute();





 $result = $req->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);

?>
