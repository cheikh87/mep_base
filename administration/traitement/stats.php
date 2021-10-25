<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd






    $sql = 'select to_char(to_timestamp (date_part(\'MONTH\', date_modification)::text, \'MM\'), \'Mon\') as mois,avg(pourcentage_realisation) as niveau_realisation from activites   GROUP BY to_char(to_timestamp (date_part(\'MONTH\', date_modification)::text, \'MM\'), \'Mon\')  order by mois ASC OFFSET 0 LIMIT 5';
    $req = $conn->prepare($sql);
    $req->execute();



  $data = array();
      while($row=$req->fetch(PDO::FETCH_ASSOC)){

        $data['data'][] = $row;

  }


  echo json_encode($data);

?>
