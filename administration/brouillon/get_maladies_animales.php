<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd






    $sql = 'select maladies_animales.gid,maladies_animales.localite,maladies_animales.maladie,maladies_animales.service_departemental,maladies_animales.data_apparition,maladies_animales.veterinaire,maladies_animales.action,maladies.maladie as nom_maladie,localites.localite as nom_localite from maladies_animales,maladies,localites where maladies_animales.maladie=maladies.gid and maladies_animales.localite=localites.gid';
    $req = $conn->prepare($sql);
    $req->execute();



  $data = array();
      while($row=$req->fetch(PDO::FETCH_ASSOC)){

        $data['data'][] = $row;

  }


  echo json_encode($data);

?>
