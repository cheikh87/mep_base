<?php
error_reporting(0);
header("Content-type: application/x-javascript; charset=utf-8");
include_once('../api/config.php');

$sql_point_f="select DISTINCT nom_table from legendes where type_geom='POINT' or type_geom='MULTIPOINT' order by nom_table";

$qid_point_f = $conn->prepare($sql_point_f);
$qid_point_f->execute();

while($row_point_f=$qid_point_f->fetch(PDO::FETCH_ASSOC) )      
        {

$return_point0='';

$return_point.='if(feature.properties.couche_select==="'.$row_point_f[nom_table].'") {';

$sql_point="select *from legendes where nom_table='".$row_point_f[nom_table]."' order by priorite ASC";
$qid_point = $conn->prepare($sql_point);
$qid_point->execute();


 while($row_point=$qid_point->fetch(PDO::FETCH_ASSOC) )      
        {
	$return_point0='';
		
			if($row_point[type_legende]=="Autre")
	
			$return_point0.='
			if(feature.properties.'.$row_point[colonne].'==="'.$row_point[valeurs].'") 
			return L.marker(coordinates, {
  icon: L.divIcon({
    className: \'map-marker A\',
     iconSize:10,
   html:\'<div class="icon" style="background:"><img style="width:20px;height:20px" src="images/legendes/'.$row_point[styles].'"></img></div>\'
  })
});
';
		
	else	
		
		$return_point0.='
		if(feature.properties.aaaabssssasbbbsss==="'.$row_point[nom_table].'") return L.marker(coordinates, {
  icon: L.divIcon({
    className: \'map-marker A\',
     iconSize:10,
   html:\'<div class="icon" style="background:"><img style="width:20px;height:20px" src="images/legendes/'.$row_point[styles].'"></img></div>\'
  })
});

	else	
		
	return L.marker(coordinates, {
  icon: L.divIcon({
    className: \'map-marker A\',
     iconSize:10,
   html:\'<div class="icon" style="background:"><img style="width:20px;height:20px" src="images/legendes/'.$row_point[styles].'"></img></div>\'
  })
});

		
	
';


$return_point.=$return_point0;
		}
				
		$return_point.="}";
		
		}
	
?>	
function get_couche(obj)
{
var emprise=$('input[name=option_s]:checked').val();


var id_emprise=$('#sub_category_'+emprise).val();

if(obj==="all")
{

var couche_active=layer;
var couche_select=liste_des_couches[nom_layer];
$("#couche_activer").val(couche_select);

var container_couche=new L.GeoJSON.AJAX("api/get_couche.php?couche="+couche_select+"&emprise="+emprise+"&id_emprise="+id_emprise, {
onEachFeature: onEachFeature,
    pointToLayer: function (feature, coordinates) {
   
 feature.properties.couche_select=couche_select;
<?php echo $return_point; ?> 



        }
     })
	 
	 

couche_active.clearLayers();	 
container_couche.addTo(couche_active);


container_couche.on('data:loaded', function() {
map.fitBounds(container_couche.getBounds());


$("#chargement_zone").html('');
	
}.bind(this));

}


else
{
$("#Modal_select_entite").removeClass('show');
$("#loader").html('<img src="images/loader.gif">');
var couche_active=obj.layer;
var couche_select=liste_des_couches[obj.name];

$("#couche_activer").val(couche_select);


var tab=[];
var k=0;
var container_couche=new L.GeoJSON.AJAX("api/get_couche.php?couche="+couche_select+"&emprise="+emprise+"&id_emprise="+id_emprise, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, coordinates) {
		feature.properties.couche_select=couche_select;
		
		
 
<?php echo $return_point; ?> 
        }
     })
	 
	

couche_active.clearLayers();	 
container_couche.addTo(couche_active);


container_couche.on('data:loaded', function(feature) {

$("#loader").html('');
 
$("#chargement_zone").html('');

statitstiques(couche_select,obj.name);


$("#cou_"+couche_select).html(container_couche.getLayers().length);

/*
var colour_rand=["white","yellow","black","orangered","orange","brown","blue","green"];

$("#stats_globaux").append('<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" id="stats_"'+couche_select+'>'+
                    '<div class="info-box bg-'+colour_rand[getRandomInt(8)]+' hover-expand-effect">'+
                        '<div class="icon">'+
                            '<i class="material-icons">playlist_add_check</i>'+
                        '</div>'+
                        '<div class="content">'+
                            '<div class="text">'+obj.name+'</div>'+
                           ' <div class="number count-to" data-from="0" data-to="125" data-speed="15" data-fresh-interval="20">Total: '+container_couche.getLayers().length+'</div>'+
                        '</div>'+
                   ' </div>'+
                '</div>');
				
				*/
	
});



}





	
}

function Style_par_defaut(feature,couche,geom) {
	
<?php 

$sql0="select distinct nom_table from legendes";

$qid0 = $conn->prepare($sql0);
$qid0->execute();


while( $row0=$qid0->fetch(PDO::FETCH_ASSOC) )       
{
	
$element="";

$nom_table=$row0[nom_table];

$sql="select *from legendes where nom_table='".$nom_table."' order by priorite ASC";
//$sql="select *from legendes where nom_table='".$nom_table."' and type_geom!='POINT' and type_geom!='MULTIPOINT' order by priorite ASC";

$qid = $conn->prepare($sql);
$qid->execute();


$sql_="select colonne,type_geom,type_valeur from legendes where nom_table='".$nom_table."' limit 1";
$qid_ = $conn->prepare($sql_);
$qid_->execute();

$row1 = $qid_->fetchAll();

?>	
if(couche==="<?php echo $nom_table; ?>")

{
	

	
<?php
 if($row1[0][type_geom]=="POINT" || $row1[0][type_geom]=="MULTIPOINT")
{
?>	
	
       <?php while($row=$qid->fetch(PDO::FETCH_ASSOC) )      
        {
			$nom_legende=$row[nom_legende];
			$nom_legende=str_replace("'","\'",$nom_legende);
			
			
			$element.="{
                label: '". $nom_legende."',
                html: '<img src=\"images/legendes/".$row[styles]."\" style=\"width:20px;height:20px\"  aria-hidden=\"false\">',
                style: {
                    'background': '". $row[styles]."',
					'color': '". $row[styles]."',
                    'width': '20px',
                    'height': '20px'
                }
            },";
			
			if($row[type_legende]!="default")
			{
				if($row[symbole]=="=") $symbole="==="; else $symbole=$row[symbole];
		?> 
		
	var greenIcon = L.icon({
    iconUrl: 'images/legendes/<?php  echo $row[styles]; ?>',
    shadowUrl: 'images/legendes/<?php  echo $row[styles]; ?>',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
	
if(feature.<?php  echo $row1[0][colonne]; echo $symbole; if($row1[0][type_valeur]!='nombre') echo '"'.$row[valeurs].'"'; else echo $row[valeurs]; ?> )   return L.marker(geom.coordinates, {icon: greenIcon});
		
		<?php 
		}
		
		else
		{
		?>	
		 if(feature.dimaaaaaaaassaa=="1")
			 return {color: "#5F9EA0",fillColor:"none",weight:"1",fillOpacity: 0.7,opacity: 0.7};
		 else  return {color: "#5F9EA0",fillColor:"none",weight:"1",fillOpacity: 0.7,opacity: 0.7};		
		<?php 
		}
		?>
		<?php 
		}
		
		?>

<?php
}
else

{
?>
     
		  <?php while($row=$qid->fetch(PDO::FETCH_ASSOC) )      
        {
			
			$nom_legende=$row[nom_legende];
			$nom_legende=str_replace("'","\'",$nom_legende);
			
			$element.="{
                label: '". $nom_legende."',
                html: '<div></div>',
                style: {
                    'background': '". $row[styles]."',
					'color': '". $row[styles]."',
                    'width': '10px',
                    'height': '10px'
                }
            },";		
		
			
			if($row[type_legende]!="default")
			{
				if($row[symbole]=="=") $symbole="==="; else $symbole=$row[symbole];
				
				if($row[taille]<1) $taille=1; else $taille=$row[taille];
				if($row[bordure]=="Dasharray") $bordure=3; else $bordure="";
		?> 
		
			
	
if(feature.<?php  echo $row1[0][colonne]; echo $symbole; if($row1[0][type_valeur]!='nombre') echo '"'.$row[valeurs].'"'; else echo $row[valeurs]; ?> )   return {color: "<?php echo $row[styles]; ?>",fillColor:"<?php echo $row[styles]; ?>",weight:<?php echo $taille; ?>,fillOpacity: 0.7,opacity: 0.7, radius:<?php echo $taille; ?>,dashArray:"<?php echo $bordure; ?>,10"};
		
		<?php 
		}
		
		else
		{
			if($row[taille]<1) $taille=1; else $taille=$row[taille];
			if($row[bordure]=="Dasharray") $bordure=3; else $bordure="";
		?>	
		 if(feature.dimaaaaaaaassaa=="1")
			 return {color: "#5F9EA0",fillColor:"none",weight:"1",fillOpacity: 0.7,opacity: 0.7};
		 else  return {color: "<?php echo $row[styles]; ?>",fillColor:"<?php echo $row[styles]; ?>",weight:<?php echo $taille; ?>,fillOpacity: 0.7,opacity: 0.7, radius:<?php echo $taille; ?>,dashArray:"<?php echo $bordure; ?>,10"};
	
		<?php 
		}
		?>
		<?php 
		}
		
		?>

	

<?php
}
?>


}

		

<?php

$legende.="{
            name: '".$nom_table."',
            layer: ".$nom_table.",
            elements: [".substr($element, 0, -1)."]
        },";


}
$legende=substr($legende, 0, -1);
?>

}


var htmlLegend1and2 = L.control.htmllegend({
        position: 'bottomright',
        legends: [<?php echo $legende;?>],
        collapseSimple: true,
        detectStretched: true,
        collapsedOnInit: false,
        defaultOpacity: 0.7,
        visibleIcon: 'icon icon-eye',
        hiddenIcon: 'icon icon-eye-slash'
    })