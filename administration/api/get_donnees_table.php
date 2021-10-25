<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd


$liste_champ=$_POST[liste_champ];
$liste_champ=json_encode(array_values($liste_champ),JSON_UNESCAPED_UNICODE);


$liste_champ=str_replace("[","",$liste_champ);
$liste_champ=str_replace("]","",$liste_champ);
$table=$_POST[table];



    $sql = 'select gid,'.$liste_champ.' from '.$table.'';
    $req = $conn->prepare($sql);
    $req->execute();



  $data = array();
      while($row=$req->fetch(PDO::FETCH_ASSOC)){

        $data['data'][] = $row;

  }


  echo json_encode($data);

?>
