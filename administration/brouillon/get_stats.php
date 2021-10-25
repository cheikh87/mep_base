<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd




$id=$_GET["id"];
$annee=$_GET["annee"];


    $sql = '(SELECT count(*) as nombre,to_char(date_vue, \'DD\') as date from nombre_vue GROUP BY to_char(date_vue, \'DD\')) UNION ALL (SELECT count(*) as nombre,to_char(date_vue, \'DD\') as date from nombre_vue where date_vue between( select (NOW()::date - 7*i) as d from generate_series(1,1) i order by d ASC) and NOW() GROUP BY to_char(date_vue, \'DD\')) UNION ALL ( SELECT count(*) as nombre,to_char(date_vue, \'MM\') as date from nombre_vue GROUP BY to_char(date_vue, \'MM\')) UNION ALL ( SELECT count(*) as nombre,to_char(date_vue, \'YYYY\') as date from nombre_vue GROUP BY to_char(date_vue, \'YYYY\'))';
    $req = $conn->prepare($sql);
    $req->execute();





 $result = $req->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);

?>
