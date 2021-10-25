<?php
error_reporting(0);
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd
include_once('config.php');

$type_entite=$_POST['type_entite'];
$couche=$_POST['couche'];
$id=implode(",",$_POST['id']);



if($type_entite=="Nationale")
{
$type_entite="regions";	
$sql = 'SELECT count(*)as nombre,'.$type_entite.'.nom,'.$type_entite.'.gid,'.$couche.'.mise_en_service,mise_en_service.niveau from '.$type_entite.' left join '.$couche.'
on St_within('.$couche.'.geom,'.$type_entite.'.geom) join mise_en_service on mise_en_service.id_niveau='.$couche.'.mise_en_service where zone_projet=true
GROUP BY mise_en_service,'.$type_entite.'.nom,'.$type_entite.'.gid,mise_en_service.niveau order by '.$type_entite.'.gid';	
}

else
$sql = 'SELECT count(*)as nombre,'.$type_entite.'.nom,'.$type_entite.'.gid,'.$couche.'.mise_en_service,mise_en_service.niveau from '.$type_entite.' left join '.$couche.'
on St_within('.$couche.'.geom,'.$type_entite.'.geom) join mise_en_service on mise_en_service.id_niveau='.$couche.'.mise_en_service where '.$type_entite.'.gid in('.$id.')
GROUP BY mise_en_service,'.$type_entite.'.nom,'.$type_entite.'.gid,mise_en_service.niveau order by '.$type_entite.'.gid';
    $req = $conn->prepare($sql);
    $req->execute();  



$result = $req->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result, JSON_NUMERIC_CHECK);

?>