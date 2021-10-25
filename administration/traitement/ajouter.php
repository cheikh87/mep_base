<?php
error_reporting(0);
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd
include_once('config2.php');
header("Access-Control-Allow-Origin: *");//this allows coors
    header('Content-Type: application/json');



$table = $_POST['table'];; // on stocke le type dan sune ariable

foreach($_POST as $index=>$v)
	{
	if($index!='id' and $index!='table' and  $index!='SHAPE' )
	{	
if($v=='null') $v=null;
$v=str_replace("'", "''" ,$v);
$v=str_replace(",", "." ,$v);
	$req1.="'".$v."',";
	$req2.=''.$index.',';
	}
	
	}

if($_POST[SHAPE])
{	
$shape ="GeomFromText('POINT(".$_POST[lon]." ".$_POST[lat].")',1)";
$req2.="SHAPE";
$req1.=$shape;
}

else
{
$req1=substr($req1,0,-1);
$req2=substr($req2,0,-1);
}






   $sql = 'insert into '.$table.' ('.$req2.')   values('.$req1.')';
    $req = $conn->prepare($sql);
    $req->execute();  


	

$code=$req->errorInfo();



$code=$req->errorInfo();



if($code[0]=="00000")
{	
header("Status: 404 Not Found");
echo json_encode(array('message' =>"Succes les données ont bien été ajoutées")); 
}
else
  
{ 
echo header("HTTP/1.1 500 Not Found");;	
echo json_encode(array('message' =>"Les données n'ont pas été enregistrées, veuillez réassayer"));
}
	



?>