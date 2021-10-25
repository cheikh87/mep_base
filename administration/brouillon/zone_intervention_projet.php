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

$id_projet=$_GET['id_projet'];
$entite=$_GET['entite'];

if($entite==="*")
$sql = "(SELECT zone_intervention_projet.gid,public.ST_AsGeoJSON(public.ST_Transform((regions.geom),4326),2) AS geojson ,projets.nom_du_projet,projets.description_du_projet,zone_intervention_projet.entites as type_entite,regions.nom from regions,projets,zone_intervention_projet where regions.gid=zone_intervention_projet.id_entite and projets.gid=zone_intervention_projet.id_projet  and zone_intervention_projet.entites='regions' and projets.gid=$id_projet) UNION (SELECT zone_intervention_projet.gid,public.ST_AsGeoJSON(public.ST_Transform((departements.geom),4326),2) AS geojson ,projets.nom_du_projet,projets.description_du_projet,zone_intervention_projet.entites as type_entite,departements.nom from departements,projets,zone_intervention_projet where departements.gid=zone_intervention_projet.id_entite and projets.gid=zone_intervention_projet.id_projet  and zone_intervention_projet.entites='departements' and projets.gid=$id_projet) UNION (SELECT zone_intervention_projet.gid,public.ST_AsGeoJSON(public.ST_Transform((communes.geom),4326),2) AS geojson ,projets.nom_du_projet,projets.description_du_projet,zone_intervention_projet.entites as type_entite,communes.nom from communes,projets,zone_intervention_projet where communes.gid=zone_intervention_projet.id_entite and projets.gid=zone_intervention_projet.id_projet  and zone_intervention_projet.entites='communes' and projets.gid=$id_projet)";

else	
$sql = "SELECT public.ST_AsGeoJSON(zone_intervention_projet.gid,public.ST_Transform(($entite.geom),4326),2) AS geojson ,projets.nom_du_projet,projets.description_du_projet,zone_intervention_projet.entites as type_entite,$entite.nom from $entite,projets,zone_intervention_projet where $entite.gid=zone_intervention_projet.id_entite and projets.gid=zone_intervention_projet.id_projet  and zone_intervention_projet.entites='$entite' and projets.gid=$id_projet";


/*
* If bbox variable is set, only return records that are within the bounding box
* bbox should be a string in the form of 'southwest_lng,southwest_lat,northeast_lng,northeast_lat'
* Leaflet: map.getBounds().toBBoxString()
*/
// if (isset($_GET['bbox'])) {
    // $bbox = explode(',', $_GET['bbox']);
    // $sql = $sql . ' WHERE public.ST_Transform(the_geom, 4326) && public.ST_SetSRID(public.ST_MakeBox2D(public.ST_Point('.$bbox[0].', '.$bbox[1].'), public.ST_Point('.$bbox[2].', '.$bbox[3].')),4326);';
// }

# Try query or error
$rs = $conn->query($sql);
if (!$rs) {
    echo 'An SQL error occured.\n';
    exit;
}

# Build GeoJSON feature collection array
$geojson = array(
   'type'      => 'FeatureCollection',
   'features'  => array()
);

# Loop through rows to build feature arrays
while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
    $properties = $row;
    # Remove geojson and geometry fields from properties
    unset($properties['geojson']);
    unset($properties['geom']);
    $feature = array(
         'type' => 'Feature',
         'geometry' => json_decode($row['geojson'], true),
         'properties' => $properties
    );
    # Add feature arrays to feature collection array
    array_push($geojson['features'], $feature);
}

header('Content-type: application/json');
echo json_encode($geojson, JSON_NUMERIC_CHECK);
$conn = NULL;
?>
