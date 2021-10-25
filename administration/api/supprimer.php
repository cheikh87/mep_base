<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');


$gid = $_POST['gid']; // on stocke le type dan sune ariable
$table = $_POST['table']; // on stocke le type dan sune ariable



    $sql = 'delete from '.$table.' where gid='.$gid.'';
    $req = $conn->prepare($sql);
    $req->execute();  


$code=$req->errorInfo();



if($code[0]=="00000")
{	
header("Status: 404 Not Found");
echo json_encode(array('message' =>"La suppression a été bien effectuée")); 
}
else
  
{ 
echo header("HTTP/1.1 500 Not Found");;	
echo json_encode(array('message' =>"La suppression a echouée, veuillez reprendre"));
}
	



?>