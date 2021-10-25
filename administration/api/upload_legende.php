<?php
error_reporting(0);


function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}




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

$newfilename= date('dmYHis').str_replace(" ", "", basename($_FILES["file1"]["name"]));

$nonextensions_valides = array( 'png','jpg','gif','ico','PNG','JPG','GIF');
//1. strrchr renvoie l'extension avec le point (« . »).
//2. substr(chaine,1) ignore le premier caractère de chaine.
//3. strtolower met l'extension en minuscules.
$extension_upload = strtolower(  substr(  strrchr($_FILES['file1']['name'], '.')  ,1)  );
if ( in_array($extension_upload,$nonextensions_valides) ) 
{
if(move_uploaded_file($fileTmpLoc, "../../images/legendes/$newfilename")){
	
echo "$newfilename";
	
}

else {
    echo "Erreur lors de l'importation du document, veuillez réessayer";
}

}

else echo " <b style='color:red'>Extension non supportée  </b>";


?>