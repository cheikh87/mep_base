<?php
error_reporting(0);
include_once('config2.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd


$id=$_GET[marche];


 $sql = 'SELECT marche_suivi.OGR_FID ,marche_suivi.marches as nom,marche_suivi.x_coord,marche_suivi.y_coord,marche_suivi.collec_loc,marche_suivi.arrondis_1,marche_suivi.departem_1,marche_suivi.region_1 as region,marche_suivi.lon,marche_suivi.lat,marche_suivi.typologie,donnees_marche.nombre_tet,donnees_marche.min,donnees_marche.max,donnees_marche.frequent,donnees_marche.date FROM  marche_suivi,donnees_marche where marche_suivi.OGR_FID=donnees_marche.OGR_FID2 and marche_suivi.OGR_FID='.$id.'   order by donnees_marche.date ASC ';
    $req = $conn->prepare($sql);
    $req->execute();



  $data = array();
      while($row=$req->fetch(PDO::FETCH_ASSOC)){

        $data['data'][] = $row;

  }


  echo json_encode($data);

?>
