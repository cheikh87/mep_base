<?php
error_reporting(0);
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd
include_once('config.php');

$nom_table = $_GET['nom_table']; // on stocke le type dan sune ariable




    $sql = "select *from legendes where nom_table='".$nom_table."' and type_legende!='default' UNION select *from legendes where nom_table='".$nom_table."' and type_legende='default'";
    $req = $conn->prepare($sql);
    $req->execute();  



$result = $req->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);

?>