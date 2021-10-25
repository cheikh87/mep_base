<?php
error_reporting(0);
include_once 'config2.php';
require "vendor/autoload.php";
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


//$email = 'admin';
//$password = "43e4098d87de96d3cfb129a4bcbdb48f";

//$databaseService = new DatabaseService();
//$conn = $databaseService->getConnection();



$data = $_POST;
//$data =json_encode($content) ;
 
//Attempt to decode the incoming RAW post data from JSON.

//$data = json_decode($content, true);
$email = $data[email];
$password = $data[password];



$salt = 'BwGaKJJD@MLP6aAA'; // $salt permet d'avoir un mot de passe plus s&eacute;curis&eacute;
$password = md5($password.$salt);


$table_name = 'utilisateur';

$query = "SELECT iduser as id, prenom, statut as statut, password FROM " . $table_name . " WHERE email = '".$email."' and statut_compte=4";
$stmt = $conn->prepare( $query );
$stmt->execute();
$num = $stmt->rowCount();


if($num > 0){
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $id = $row['id'];
    $firstname = $row['prenom'];
    $lastname = $row['statut'];
    $password2 = $row['password'];
	

    if($password==$password2)
    {
        $secret_key = "YOUR_SECRET_KEY";
        $issuer_claim = "THE_ISSUER"; // this can be the servername
        $audience_claim = "THE_AUDIENCE";
        $issuedat_claim = time(); // issued at
        $notbefore_claim = $issuedat_claim + 10; //not before in seconds
        $expire_claim = $issuedat_claim + 1800; // expire time in seconds
        $token = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim,
            "nbf" => $notbefore_claim,
            "exp" => $expire_claim,
            "data" => array(
                "id" => $id,
                "prenom" => $firstname,
                "statut" => $lastname,
                "email" => $email
        ));

        http_response_code(200);

        $jwt = JWT::encode($token, $secret_key);
        echo json_encode(
            array(
                "message" => "Connexion validée",
                "token" => $jwt,
                "email" => $email,
                "expireAt" => $expire_claim
            ));
    }
    else{

        http_response_code(401);
        echo json_encode(array("message" => "Login ou mot de passe incorrect", "password" => $password));
    }
}
?>