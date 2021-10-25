<?php
error_reporting(0);
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd
include_once('config.php');

$nom_table = $_GET['nom_table']; // on stocke le type dan sune ariable




    $sql = "select dictionnaire.id as gid,dictionnaire.nom_table,dictionnaire.nom_colonne,dictionnaire.definition,dictionnaire.data_type,geometry_columns.type as type_geom,dictionnaire.popup_view,dictionnaire.label_view from dictionnaire,geometry_columns where dictionnaire.nom_table=geometry_columns.f_table_name and dictionnaire.nom_table='".$nom_table."' and  UPPER(dictionnaire.nom_colonne) not like '%' || UPPER('gid') || '%' and UPPER(dictionnaire.nom_colonne) not like '%' || UPPER('geom') || '%' and UPPER(dictionnaire.nom_colonne) not like '%' || UPPER('object') || '%' and UPPER(dictionnaire.nom_colonne) not like '%' || UPPER('shape') || '%'";
    $req = $conn->prepare($sql);
    $req->execute();  



$result = $req->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);

?>