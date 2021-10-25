<?php
error_reporting(0);
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');


$gid = $_POST['gid']; // on stocke le type dan sune ariable
$table = $_POST['table'];; // on stocke le type dan sune ariable

foreach($_POST as $index=>$v)
	{
	if($index!='id' and $index!='table' and $index!='gid' and $index!='SHAPE' and $index!='lon' and $index!='lat')
	{	
if($v=='null') $v=0;
$v=str_replace("'", "''" ,$v);
	$req1.=$index."='".$v."',";
	}
	
	}	

$req1=substr($req1,0,-1);



   $sql = 'update '.$table.' set '.$req1.'  where gid='.$gid.'';
    $req = $conn->prepare($sql);
    $req->execute();  



$code=$req->errorInfo();



if($code[0]=="00000")
{	
header("Status: 404 Not Found");
echo json_encode(array('message' =>"La mise à jour a été bien effectuée")); 
}
else
  
{ 
echo header("HTTP/1.1 500 Not Found");;	
//echo json_encode(array('message' =>"La mise à jour a echouée, veuillez reprendre"));
echo json_encode(array('message' =>$code));
}
	



?>