<?php
error_reporting(0);
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd
include_once('config.php');





    $sql = 'select elements_thematique.id as id,thematique.id as id_thematique,nom,thematique,name_table from thematique,elements_thematique where thematique.id=elements_thematique.id_thematique order by thematique.id ASC';
    $req = $conn->prepare($sql);
    $req->execute();  
	$result = $req->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);

?>