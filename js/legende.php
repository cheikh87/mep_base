<?php
header("Content-type: application/x-javascript");
include_once('../api/config.php');
error_reporting(0);
$sql="select DISTINCT thematique.id,thematique from thematique,elements_thematique where thematique.id=elements_thematique.id_thematique";
$qid = $conn->prepare($sql);
$qid->execute();
 
while( $row=$qid->fetch(PDO::FETCH_ASSOC) )       
{
	$liste_c='';
$firs_entete='{
groupName : "'.$row[thematique].'",
expanded : true,';
$layers	='
layers    : { ';

						

$sql2="select *from elements_thematique where id_thematique=".$row[id]."";
$qid2 = $conn->prepare($sql2);
$qid2->execute();

while( $row2=$qid2->fetch(PDO::FETCH_ASSOC) )       
{
echo ' 
var '.$row2[name_table].' = L.featureGroup();';

$liste_c.='"'.$row2[nom].'":'.$row2[name_table].',';
$liste_c2.='"'.$row2[nom].'":"'.$row2[name_table].'",';	
$liste_icone.='"'.$row2[name_table].'":"'.$row2[icone].'",';
$liste_couleur.='"'.$row2[name_table].'":"'.$row2[code_couleur].'",';		
}	
$liste_c=substr($liste_c, 0, -1);
	

$crochet_fermet='
}';	

$last_crocher="},";

$groupe .=$firs_entete.$layers.$liste_c.$crochet_fermet.$last_crocher;
						                  
}
$groupe=substr($groupe, 0, -1);	
$liste_c2=substr($liste_c2, 0, -1);	
$liste_icone=substr($liste_icone, 0, -1);
$liste_couleur=substr($liste_couleur, 0, -1);
?>

var overlays = 
[
 <?php echo $groupe;?>
 
];  

var liste_des_couches = {<?php echo $liste_c2;?>}; 
var liste_des_icones = {<?php echo $liste_icone;?>};
var liste_des_couleurs = {<?php echo $liste_couleur;?>}; 