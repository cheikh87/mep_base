<?php
error_reporting(0);
include_once('config2.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd




$type=$_GET[type];
$id=$_GET[id];

if($type=="region")
    $sql = 'select nomreg as id, nomreg as intitule from region';
else
	$sql = 'select nom_dep as id, nom_dep as intitule from departements where nom_reg in(select nomreg from region where nomreg="'.$id.'")';
	
    $req = $conn->prepare($sql);
    $req->execute();

 

 $result = $req->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);

?>
