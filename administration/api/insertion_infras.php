<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-type: application/json');
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


	
$decoded_i=$decoded[shape];
//$decoded_i=$decoded_i[features];
$decoded_i=json_encode($decoded_i);

$parsed_json = json_decode($decoded_i,true);
$up=json_encode($decoded[up], JSON_NUMERIC_CHECK);
foreach ($parsed_json[features] as $index=>$v) {
	
$crs ='{"type":"name","properties":{"name":"EPSG:4326"}}';
$v['geometry']['crs']= $crs;
$v['geometry']['type']="MultiPoint";
$v['geometry']['coordinates']=[$v['geometry']['coordinates']];

$parsed_json[features][$index]['geometry']=$v['geometry'];
$parsed_json[features][$index]['properties']['up']=$up;
//$parsed_json[features][$index]['properties']['type_zone']=$type_zone;		
//echo json_encode($parsed_json[features]);

 }
 





$sql = "WITH data AS (SELECT '".json_encode($parsed_json)."'::json AS fc) insert into infrastructures_up (nom ,up ,type,code,shape)
 (
 SELECT 
 feat->'properties'->>'nom'::text AS nom,
  CAST(coalesce(feat->'properties'->>'up', '0') AS integer) AS up,
 feat->'properties'->>'type'::text AS type,
 CAST(coalesce(feat->'properties'->>'code', '0') AS integer) AS code,
 ST_Force2D(ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON(feat->>'geometry'),4326),4326)) AS shape 
 FROM (
 SELECT json_array_elements(fc->'features') AS feat 
 FROM data 
 ) AS f 
 );";
 
 


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
