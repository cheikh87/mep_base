<?php
error_reporting(0);
header("Content-type: application/x-javascript; charset=utf-8");
include_once('../api/config.php');
?>		
<?php 
$sql0="select distinct nom_table from legendes";
$qid0 = $conn->prepare($sql0);
$qid0->execute();
while( $row0=$qid0->fetch(PDO::FETCH_ASSOC) )       
{

$element="";

$nom_table=$row0[nom_table];

$sql="select *from legendes where nom_table='".$nom_table."' order by priorite ASC";

$qid = $conn->prepare($sql);
$qid->execute();


$sql_="select colonne,type_geom,type_valeur from legendes where nom_table='".$nom_table."' limit 1";
$qid_ = $conn->prepare($sql_);
$qid_->execute();

$row1 = $qid_->fetchAll();

?>		
<?php
 if($row1[0][type_geom]=="POINT" || $row1[0][type_geom]=="MULTIPOINT")
{
?>	
       <?php while($row=$qid->fetch(PDO::FETCH_ASSOC) )      
        {
			
			$element.="{
                label: '". $row[nom_legende]."',
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
		<?php 
		}		
		else
		{
		?>		
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
?>   		  <?php while($row=$qid->fetch(PDO::FETCH_ASSOC) )      
        {
		
$element.="{
                label: '". $row[nom_legende]."',
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
		?> 				
		<?php 
		}
		
		else
		{
		?>	
			
		<?php 
		}
		?>
		<?php 
		}
		//$element=substr($element, 0, -1);
		?>
<?php
}
?>		
<?php
//$element=substr($element, 0, -1);
$legende.="{
            name: '".$nom_table."',
            layer: ".$nom_table.",
            elements: [".substr($element, 0, -1)."]
        },";


}
$legende=substr($legende, 0, -1);
?>
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