<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd






    $sql = 'select documents.gid,documents.type_doc,documents.nom_document,documents.description,documents.description,type_document.type_doc as type_document from documents,type_document where documents.type_doc=type_document.gid';
    $req = $conn->prepare($sql);
    $req->execute();



  $data = array();
      while($row=$req->fetch(PDO::FETCH_ASSOC)){

        $data['data'][] = $row;

  }


  echo json_encode($data);

?>
