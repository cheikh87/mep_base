<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd


$entite=$_GET[entite];
$id_parent=$_GET[id_parent];


if($entite=='regions')
    $sql = 'select *from '.$entite.'';
else
	 $sql = "select *from ".$entite." where id_parent='".$id_parent."'";
 
    $req = $conn->prepare($sql);
    $req->execute();



 $result = $req->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);

?>
