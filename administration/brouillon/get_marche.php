<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd






    $sql = 'select marche_suivi.gid,marches,typologie,marche_suivi.region,marche_suivi.departement,marche_suivi.commune,regions.nom as nom_region, departements.nom as nom_departement, communes.nom as nom_commune from marche_suivi,regions,departements,communes where marche_suivi.region=regions.gid and marche_suivi.departement=departements.gid and marche_suivi.commune=communes.gid';
    $req = $conn->prepare($sql);
    $req->execute();



  $data = array();
      while($row=$req->fetch(PDO::FETCH_ASSOC)){

        $data['data'][] = $row;

  }


  echo json_encode($data);

?>
