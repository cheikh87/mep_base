<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd






       $sql = 'select vol_betail.gid,vol_betail.localite,localites.localite as nom_localite,nombre,observations,date_vol,espece,especes.nom_espece from vol_betail,especes,localites where vol_betail.espece=especes.gid and vol_betail.localite=localites.gid';
    $req = $conn->prepare($sql);
    $req->execute();



  $data = array();
      while($row=$req->fetch(PDO::FETCH_ASSOC)){

        $data['data'][] = $row;

  }


  echo json_encode($data);

?>
