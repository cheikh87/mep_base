<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd






    $sql = 'select donnees_marches.nombre_tet,donnees_marches.min,donnees_marches.max,donnees_marches.frequent,donnees_marches.date,marche_suivi.marches as marche,marche_suivi.typologie,donnees_marches.marche as id_marche,donnees_marches.gid from donnees_marches, marche_suivi where marche_suivi.gid=donnees_marches.marche';
    $req = $conn->prepare($sql);
    $req->execute();



  $data = array();
      while($row=$req->fetch(PDO::FETCH_ASSOC)){

        $data['data'][] = $row;

  }


  echo json_encode($data);

?>
