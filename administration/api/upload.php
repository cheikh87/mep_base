<?php
error_reporting(0);
ini_set("upload_max_filesize", "255M");
ini_set("post_max_size", "256M");
$fileName = $_FILES["file1"]["name"]; // The file name
$fileTmpLoc = $_FILES["file1"]["tmp_name"]; // File in the PHP tmp folder
$fileType = $_FILES["file1"]["type"]; // The type of file it is
$fileSize = $_FILES["file1"]["size"]; // File size in bytes
$fileErrorMsg = $_FILES["file1"]["error"]; // 0 for false... and 1 for true
if (!$fileTmpLoc) { // if file not chosen
    echo "ERROR: Please browse for a file before clicking the upload button.";
    exit();
}

$nonextensions_valides = array( 'zip');
//1. strrchr renvoie l'extension avec le point (« . »).
//2. substr(chaine,1) ignore le premier caractère de chaine.
//3. strtolower met l'extension en minuscules.
$extension_upload = strtolower(  substr(  strrchr($_FILES['file1']['name'], '.')  ,1)  );
if ( in_array($extension_upload,$nonextensions_valides) ) 
{
if(move_uploaded_file($fileTmpLoc, "zip/$fileName")){
	
echo "$fileName";
	
}

else {
    echo "Erreur lors de l'importation du document, veuillez réessayer";
}

}

else echo " <b style='color:red'>Extension non supportée  </b>";


?>