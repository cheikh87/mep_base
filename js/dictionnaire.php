<?php
header("Content-type: application/x-javascript");
include_once('../api/config.php');
error_reporting(0);

$sql0="select *from elements_thematique";
$qid0 = $conn->prepare($sql0);
$qid0->execute();

echo "var champs_dictionnaire = function(couche) {";
 
 while( $row0=$qid0->fetch(PDO::FETCH_ASSOC) )       
{


$sql="select *from dictionnaire where nom_table='".$row0[name_table]."'  order by nom_table";
$qid = $conn->prepare($sql);
$qid->execute();

$liste_c='';
$liste_c2=''; 
while( $row=$qid->fetch(PDO::FETCH_ASSOC) )       
{
if($row[popup_view]==true)
$liste_c.='"'.$row[nom_colonne].'":"'.$row[definition].'",';
if($row[label_view]==true)
$liste_c2.='"'.$row[nom_colonne].'":"'.$row[definition].'",';

$table_ancien=$row[nom_table];					                  
}

$liste_c=substr($liste_c, 0, -1);
$liste_c2=substr($liste_c2, 0, -1);	
?>

if(couche==='<?php echo $row0[name_table]; ?>')
{
	var dicte=[];
	
var dictionnaire = {<?php echo $liste_c;?>}; 
var dictionnaire_view = {<?php echo $liste_c2;?>}; 

dicte.push(dictionnaire);
dicte.push(dictionnaire_view);

return dicte;

}

<?php
}
?>

}