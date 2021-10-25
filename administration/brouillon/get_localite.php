<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd






    $sql = 'select localites.gid,localite,localites.region,localites.departement,localites.commune,regions.nom as nom_region, departements.nom as nom_departement, communes.nom as nom_commune from localites,regions,departements,communes where localites.region=regions.gid and localites.departement=departements.gid and localites.commune=communes.gid';
    $req = $conn->prepare($sql);
    $req->execute();



  $data = array();
      while($row=$req->fetch(PDO::FETCH_ASSOC)){

        $data['data'][] = $row;

  }


  echo json_encode($data);

?>
