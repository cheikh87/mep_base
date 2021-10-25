<?php
error_reporting(0);
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd
include_once('config.php');

function replaceSpecialChar($str) {
$ch0 = array( 
        "œ"=>"oe",
        "Œ"=>"OE",
        "æ"=>"ae",
        "Æ"=>"AE",
        "À" => "A",
        "Á" => "A",
        "Â" => "A",
        "à" => "A",
        "Ä" => "A",
        "Å" => "A",
        "&#256;" => "A",
        "&#258;" => "A",
        "&#461;" => "A",
        "&#7840;" => "A",
        "&#7842;" => "A",
        "&#7844;" => "A",
        "&#7846;" => "A",
        "&#7848;" => "A",
        "&#7850;" => "A",
        "&#7852;" => "A",
        "&#7854;" => "A",
        "&#7856;" => "A",
        "&#7858;" => "A",
        "&#7860;" => "A",
        "&#7862;" => "A",
        "&#506;" => "A",
        "&#260;" => "A",
        "à" => "a",
        "á" => "a",
        "â" => "a",
        "à" => "a",
        "ä" => "a",
        "å" => "a",
        "&#257;" => "a",
        "&#259;" => "a",
        "&#462;" => "a",
        "&#7841;" => "a",
        "&#7843;" => "a",
        "&#7845;" => "a",
        "&#7847;" => "a",
        "&#7849;" => "a",
        "&#7851;" => "a",
        "&#7853;" => "a",
        "&#7855;" => "a",
        "&#7857;" => "a",
        "&#7859;" => "a",
        "&#7861;" => "a",
        "&#7863;" => "a",
        "&#507;" => "a",
        "&#261;" => "a",
        "Ç" => "C",
        "&#262;" => "C",
        "&#264;" => "C",
        "&#266;" => "C",
        "&#268;" => "C",
        "ç" => "c",
        "&#263;" => "c",
        "&#265;" => "c",
        "&#267;" => "c",
        "&#269;" => "c",
        "Ð" => "D",
        "&#270;" => "D",
        "&#272;" => "D",
        "&#271;" => "d",
        "&#273;" => "d",
        "È" => "E",
        "É" => "E",
        "Ê" => "E",
        "Ë" => "E",
        "&#274;" => "E",
        "&#276;" => "E",
        "&#278;" => "E",
        "&#280;" => "E",
        "&#282;" => "E",
        "&#7864;" => "E",
        "&#7866;" => "E",
        "&#7868;" => "E",
        "&#7870;" => "E",
        "&#7872;" => "E",
        "&#7874;" => "E",
        "&#7876;" => "E",
        "&#7878;" => "E",
        "è" => "e",
        "é" => "e",
        "ê" => "e",
        "ë" => "e",
        "&#275;" => "e",
        "&#277;" => "e",
        "&#279;" => "e",
        "&#281;" => "e",
        "&#283;" => "e",
        "&#7865;" => "e",
        "&#7867;" => "e",
        "&#7869;" => "e",
        "&#7871;" => "e",
        "&#7873;" => "e",
        "&#7875;" => "e",
        "&#7877;" => "e",
        "&#7879;" => "e",
        "&#284;" => "G",
        "&#286;" => "G",
        "&#288;" => "G",
        "&#290;" => "G",
        "&#285;" => "g",
        "&#287;" => "g",
        "&#289;" => "g",
        "&#291;" => "g",
        "&#292;" => "H",
        "&#294;" => "H",
        "&#293;" => "h",
        "&#295;" => "h",
        "Ì" => "I",
        "Í" => "I",
        "Î" => "I",
        "Ï" => "I",
        "&#296;" => "I",
        "&#298;" => "I",
        "&#300;" => "I",
        "&#302;" => "I",
        "&#304;" => "I",
        "&#463;" => "I",
        "&#7880;" => "I",
        "&#7882;" => "I",
        "&#308;" => "J",
        "&#309;" => "j",
        "&#310;" => "K",
        "&#311;" => "k",
        "&#313;" => "L",
        "&#315;" => "L",
        "&#317;" => "L",
        "&#319;" => "L",
        "&#321;" => "L",
        "&#314;" => "l",
        "&#316;" => "l",
        "&#318;" => "l",
        "&#320;" => "l",
        "&#322;" => "l",
        "Ñ" => "N",
        "&#323;" => "N",
        "&#325;" => "N",
        "&#327;" => "N",
        "ñ" => "n",
        "&#324;" => "n",
        "&#326;" => "n",
        "&#328;" => "n",
        "&#329;" => "n",
        "Ò" => "O",
        "Ó" => "O",
        "Ô" => "O",
        "Õ" => "O",
        "Ö" => "O",
        "Ø" => "O",
        "&#332;" => "O",
        "&#334;" => "O",
        "&#336;" => "O",
        "&#416;" => "O",
        "&#465;" => "O",
        "&#510;" => "O",
        "&#7884;" => "O",
        "&#7886;" => "O",
        "&#7888;" => "O",
        "&#7890;" => "O",
        "&#7892;" => "O",
        "&#7894;" => "O",
        "&#7896;" => "O",
        "&#7898;" => "O",
        "&#7900;" => "O",
        "&#7902;" => "O",
        "&#7904;" => "O",
        "&#7906;" => "O",
        "ò" => "o",
        "ó" => "o",
        "ô" => "o",
        "õ" => "o",
        "ö" => "o",
        "ø" => "o",
        "&#333;" => "o",
        "&#335;" => "o",
        "&#337;" => "o",
        "&#417;" => "o",
        "&#466;" => "o",
        "&#511;" => "o",
        "&#7885;" => "o",
        "&#7887;" => "o",
        "&#7889;" => "o",
        "&#7891;" => "o",
        "&#7893;" => "o",
        "&#7895;" => "o",
        "&#7897;" => "o",
        "&#7899;" => "o",
        "&#7901;" => "o",
        "&#7903;" => "o",
        "&#7905;" => "o",
        "&#7907;" => "o",
        "ð" => "o",
        "&#340;" => "R",
        "&#342;" => "R",
        "&#344;" => "R",
        "&#341;" => "r",
        "&#343;" => "r",
        "&#345;" => "r",
        "&#346;" => "S",
        "&#348;" => "S",
        "&#350;" => "S",
        "Š" => "S",
        "&#347;" => "s",
        "&#349;" => "s",
        "&#351;" => "s",
        "š" => "s",
        "&#354;" => "T",
        "&#356;" => "T",
        "&#358;" => "T",
        "&#355;" => "t",
        "&#357;" => "t",
        "&#359;" => "t",
        "Ù" => "U",
        "Ú" => "U",
        "Û" => "U",
        "Ü" => "U",
        "&#360;" => "U",
        "&#362;" => "U",
        "&#364;" => "U",
        "&#366;" => "U",
        "&#368;" => "U",
        "&#370;" => "U",
        "&#431;" => "U",
        "&#467;" => "U",
        "&#469;" => "U",
        "&#471;" => "U",
        "&#473;" => "U",
        "&#475;" => "U",
        "&#7908;" => "U",
        "&#7910;" => "U",
        "&#7912;" => "U",
        "&#7914;" => "U",
        "&#7916;" => "U",
        "&#7918;" => "U",
        "&#7920;" => "U",
        "ù" => "u",
        "ú" => "u",
        "û" => "u",
        "ü" => "u",
        "&#361;" => "u",
        "&#363;" => "u",
        "&#365;" => "u",
        "&#367;" => "u",
        "&#369;" => "u",
        "&#371;" => "u",
        "&#432;" => "u",
        "&#468;" => "u",
        "&#470;" => "u",
        "&#472;" => "u",
        "&#474;" => "u",
        "&#476;" => "u",
        "&#7909;" => "u",
        "&#7911;" => "u",
        "&#7913;" => "u",
        "&#7915;" => "u",
        "&#7917;" => "u",
        "&#7919;" => "u",
        "&#7921;" => "u",
        "&#372;" => "W",
        "&#7808;" => "W",
        "&#7810;" => "W",
        "&#7812;" => "W",
        "&#373;" => "w",
        "&#7809;" => "w",
        "&#7811;" => "w",
        "&#7813;" => "w",
        "Ý" => "Y",
        "&#374;" => "Y",
        "Ÿ" => "Y",
        "&#7922;" => "Y",
        "&#7928;" => "Y",
        "&#7926;" => "Y",
        "&#7924;" => "Y",
        "ý" => "y",
        "ÿ" => "y",
        "&#375;" => "y",
        "&#7929;" => "y",
        "&#7925;" => "y",
        "&#7927;" => "y",
        "&#7923;" => "y",
        "&#377;" => "Z",
        "&#379;" => "Z",
        "Ž" => "Z",
        "&#378;" => "z",
        "&#380;" => "z",
        "ž" => "z",
		 " " => "_"
        );
    $str = strtr($str,$ch0);
    return strtolower($str);
}


$mytext=$_POST['mytext'];
$myselect_s=$_POST['myselect_s'];

//echo json_encode($mytext);

$table=replaceSpecialChar($_POST[table_names]); // on stocke le type dan sune ariable

$entete_table='CREATE TABLE '.$table.'(
  gid serial NOT NULL,
  lon double precision,
  lat double precision,
  geom geometry(POINT,4326) DEFAULT NULL,';
  
$pied_table='CONSTRAINT '.$table.'_pkey PRIMARY KEY (gid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE '.$table.'
  OWNER TO postgres;'; 

foreach($mytext as $index=>$v)
	{
	$type_curr=$myselect_s[$index];

	if($type_curr=="date") $type_curr.=" Default now()";
	else $type_curr.=" Default Null";
		
		
		
	$valeur_formate=replaceSpecialChar($v);
		
	$req1.=$valeur_formate." ".$type_curr.",\n";
	
	$req2.=$valeur_formate."='".$v."',";
	
	
	
	}	

$creation=$entete_table.$req1.$pied_table;

$req2=substr($req2,0,-1);






   $sql = $creation;
   $sql0 = "insert into elements_thematique (nom,id_thematique,name_table) values('".$_POST[table_names]."','".$_POST[thematique]."','".$table."')";
	
	// $sql.=";". $sql0;
		try {
     $conn->exec($sql);
	 $conn->exec($sql0);
	 
	$new_champ=$mytext;	 
	  
   foreach($new_champ as $index=>$v)
	{
	$valeur_formate=replaceSpecialChar($v);	
	$sql2 = "update dictionnaire set definition='".$v."' where nom_colonne='".$valeur_formate."' and nom_table='".$table."'";
    $req2 = $conn->prepare($sql2);
    $req2->execute(); 
	
	//echo $sql2;
	
	}


} catch(PDOException $e) {
    echo $e->getMessage();//Remove or change message in production code
}
	



echo json_encode($code);	



?>