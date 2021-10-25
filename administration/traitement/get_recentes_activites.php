<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd


$id_user=$_GET[id_user];



    $sql = 'select intitule as nom_activite,id,agent,pourcentage_realisation as pourcentage from activites where agent='.$id_user.' order by id DESC  OFFSET 0 LIMIT 5';
    $req = $conn->prepare($sql);
    $req->execute();



 $result = $req->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);

?>
