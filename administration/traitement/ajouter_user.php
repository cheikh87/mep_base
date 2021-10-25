<?php
error_reporting(0);
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd
include_once('config2.php');



$id = $_POST['id']; // on stocke le type dan sune ariable
$table = $_POST['table'];; // on stocke le type dan sune ariable

foreach($_POST as $index=>$v)
	{
	if($index!='password' and $index!='table' )
	{	
if($v=='null') $v=0;
$v=str_replace("'","''",$v);
	$req1.="'".$v."',";
	$req2.=''.$index.',';
	}
	
	}	

// $req1=substr($req1,0,-1);
// $req2=substr($req2,0,-1);
$salt = 'BwGaKJJD@MLP6aAA'; // $salt permet d'avoir un mot de passe plus s&eacute;curis&eacute;
$password0 = $_POST['password'];
$password = md5($password0.$salt);;

$rand_char = 'abcdAAAAefghiMKKHHjklmnopqrstuvwxyz0123456250789';
$rand_id = str_shuffle($rand_char);

$req2.="password";




   $sql = "insert into ".$table." (".$req2.")   values(".$req1."  '".$password."')";
    $req = $conn->prepare($sql);
    $req->execute();  


	





$code=$req->errorInfo();



if($code[0]=="00000")
{	
header("Status: 404 Not Found");
echo json_encode(array('message' =>"Succes votre compte a bien été enregistré")); 
}
else
  
{ 
echo header("HTTP/1.1 500 Not Found");;	
echo json_encode(array('message' =>"Les données n'ont pas été enregistrées, veuillez réassayer"));
}



?>