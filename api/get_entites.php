<?php
error_reporting(0);
/*
 * Title:   PostGIS to GeoJSON
 * Notes:   Query a PostGIS table or view and return the results in GeoJSON format, suitable for use in OpenLayers, Leaflet, etc.
 * Author:  Bryan R. McBride, GISP
 * Contact: bryanmcbride.com
 * GitHub:  https://github.com/bmcbride/PHP-Database-GeoJSON
 */

# Connect to PostgreSQL database
include_once('config.php');


# Build SQL SELECT statement and return the geometry as a GeoJSON element

$type_entite=$_POST['type_entite'];
$parent=implode("|",$_POST['parent']);

//echo $parent;

if($type_entite=="Region")

$sql = "SELECT DISTINCT gid,nom,denominati,parent,type_zone FROM entite_administratives where type_zone='".$type_entite."' and viewable=true";

else if($type_entite=="Departement")
$sql = "SELECT DISTINCT entite_administratives.gid,entite_administratives.nom,entite_administratives.denominati,entite_administratives.parent,entite_administratives.type_zone,parent_en.nom as nom_parent,parent_en.denominati as label FROM entite_administratives,entite_administratives as parent_en where entite_administratives.parent=parent_en.gid and entite_administratives.type_zone='Departement' and entite_administratives.parent=14";

else
$sql = "SELECT DISTINCT entite_administratives.gid,entite_administratives.nom,entite_administratives.denominati,entite_administratives.parent,entite_administratives.type_zone,parent_en.nom as nom_parent,parent_en.denominati as label FROM entite_administratives,entite_administratives as parent_en where entite_administratives.parent=parent_en.gid and entite_administratives.type_zone='Commune' and entite_administratives.parent in (select gid from entite_administratives where parent in (141,142,143))";	

$req = $conn->prepare($sql);
$req->execute();




$result = $req->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);
?>
