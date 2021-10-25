<?php
error_reporting(0);
include_once 'config.php';
$fileName = $_FILES["file1"]["name"]; // The file name
$fileTmpLoc = $_FILES["file1"]["tmp_name"]; // File in the PHP tmp folder
$fileType = $_FILES["file1"]["type"]; // The type of file it is
$fileSize = $_FILES["file1"]["size"]; // File size in bytes
$fileErrorMsg = $_FILES["file1"]["error"]; // 0 for false... and 1 for true
$description=$_GET[description];
$type_doc=$_GET[type_doc];
if (!$fileTmpLoc) { // if file not chosen
    echo "ERROR: Please browse for a file before clicking the upload button.";
    exit();
}

/*
$dossier_check = $type_doc;
if(!is_dir("../../documents/".$dossier_check)){
   mkdir("../../documents/".$type_doc);
}

*/

$newfilename= date('dmYHis').str_replace(" ", "", basename($_FILES["file1"]["name"]));

$nonextensions_valides = array( 'png','jpg','gif','ico','PNG','JPG','GIF','pdf');
//1. strrchr renvoie l'extension avec le point (« . »).
//2. substr(chaine,1) ignore le premier caractère de chaine.
//3. strtolower met l'extension en minuscules.
$extension_upload = strtolower(  substr(  strrchr($_FILES['file1']['name'], '.')  ,1)  );
if ( in_array($extension_upload,$nonextensions_valides) ) 
{

if(move_uploaded_file($fileTmpLoc, "../../documents/$newfilename")){
	
$description=str_replace("'", "''" ,$description);
     
     
   // $sql = 'insert into documents (nom_document,description,type_doc) values(\''.$fileName.'\',\''.$description.'\',\''.$type_doc.'\')';
   // $req = $conn->prepare($sql);
  //  $req->execute();  
    // // Exemple d'utilisation
    // unzip_file("unzip/".$fileName, 'unzip/');
	
    echo $newfilename;
	
?>	
<?php	
} else {
    echo "Erreur lors de l'importation du document, veuillez réessayer";
}


}

else echo " <b style='color:red'>Extension non supportée  </b>";
?>