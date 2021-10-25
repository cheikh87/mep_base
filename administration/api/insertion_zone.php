<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-type: application/json; charset=utf-8');
# Connect to PostgreSQL database
include_once('config.php');


// //Make sure that the content type of the POST request has been set to application/json
// $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
// if(strcasecmp($contentType, 'application/json') != 0){
    // throw new Exception('Content type must be: application/json');
// }
 
//Receive the RAW post data.
$content = trim(file_get_contents("php://input"));
 
//Attempt to decode the incoming RAW post data from JSON.
$decoded = json_decode($content, true);
 




/*
 * Title:   PostGIS to GeoJSON
 * Notes:   Query a PostGIS table or view and return the results in GeoJSON format, suitable for use in OpenLayers, Leaflet, etc.
 * Author:  Bryan R. McBride, GISP
 * Contact: bryanmcbride.com
 * GitHub:  https://github.com/bmcbride/PHP-Database-GeoJSON
 */



# Build SQL SELECT statement and return the geometry as a GeoJSON element




	


$parsed_json = $decoded[shape];

//$parsed_json = json_encode($_POST[shape]);
//$parsed_json = utf8_encode($parsed_json);




$liste_champ=$decoded[list_colonne];
$liste_champ=json_encode(array_values($liste_champ),JSON_UNESCAPED_UNICODE);
$liste_champ=str_replace("[","",$liste_champ);
$liste_champ=str_replace("]","",$liste_champ);
//$liste_champ=strtolower($liste_champ);

$colonne_shape=$_POST[colonne_shape];
$colonne_shape=json_encode(array_values($colonne_shape),JSON_UNESCAPED_UNICODE);
$colonne_shape=str_replace("[","",$colonne_shape);
$colonne_shape=str_replace("]","",$colonne_shape);
$colonne_shape=strtolower($colonne_shape);




$table=$decoded[table];

foreach ($decoded[list_colonne] as $index=>$v) {

$nom_champ=json_encode($decoded[list_colonne][$index],JSON_UNESCAPED_UNICODE);	
$nom_champ=str_replace('"',"",$nom_champ);
	
	if($decoded[list_type_champ][$index]=="numeric" or $decoded[list_type_champ][$index]=="integer" or $decoded[list_type_champ][$index]=="double precision")
		
		$liste_des_colonnes.= "CAST(coalesce(feat->'properties'->>'".$nom_champ."', '0') AS double precision),";

		else
$liste_des_colonnes.= "feat->'properties'->>'".$nom_champ."'::".$decoded[list_type_champ][$index].",";

 }
 $liste_des_colonnes.="ST_Force2D(ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON(feat->>'geometry'),4326),4326)) AS geom "; 

foreach (json_decode($parsed_json[features]) as $index=>$v) {
	//$v['properties']=strtolower($v['properties']);
		
	
$crs ='{"type":"name","properties":{"name":"EPSG:4326"}}';
$v['geometry']['crs']= $crs;
$v['geometry']['type']=$_POST[geometry_type];

if($_POST[geometry_type]=="POINT")
	$v['geometry']['coordinates']=$v['geometry']['coordinates'];
	
else
	$v['geometry']['coordinates']=[$v['geometry']['coordinates']];

$parsed_json[features][$index]['geometry']=$v['geometry'];
//$parsed_json[features][$index]['properties']['code_parent']=$code_parent;
//$parsed_json[features][$index]['properties']['type_zone']=$type_zone;		
//echo json_encode($parsed_json[features]);

 }
 





$sql = "WITH data AS (SELECT '".json_encode($parsed_json)."'::json AS fc) insert into ".$table." (".$liste_champ.",geom)
 (
 SELECT 
 ".$liste_des_colonnes."
 FROM (
 SELECT json_array_elements(fc->'features') AS feat 
 FROM data 
 ) AS f 
 );";
 

//echo $sql;


$req = $conn->prepare($sql);
$req->execute();  

$code=$req->errorInfo();





if($code[0]=="00000")
{	
header("Status: 404 Not Found");
echo json_encode(array('message' =>"Succes les données ont bien été ajoutées")); 
}
else
  
{ 
echo header("HTTP/1.1 500 Not Found");;	
echo json_encode(array('message' =>$code));
//echo json_encode(array('message' =>"Les données n'ont pas été enregistrées, veuillez réassayer"));
}
	



?>
