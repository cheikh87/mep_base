<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd




if($_GET[methode]=="utilisateur")

    $sql = 'select to_char(date, \'DD/MM/YYYY\') as date,pourcentage,date_part(\'day\', date) as day,to_char(to_timestamp (date_part(\'month\', date)::text, \'MM\'), \'Mon\') as month,date_part(\'month\', date) as mois,temps,pourcentage,commentaires,utilisateur.prenom as utilisateur,cast (date as time) as time from temps_passe,utilisateur where utilisateur.id=temps_passe.utilisateur and  '.$_GET[methode].'='.$_GET[id].'';
	
	else if($_GET[methode]=="projet")
	
  $sql = 'select to_char(date, \'DD/MM/YYYY\') as date,pourcentage,date_part(\'day\', date) as day,to_char(to_timestamp (date_part(\'month\', date)::text, \'MM\'), \'Mon\') as month,date_part(\'month\', date) as mois,temps,pourcentage,commentaires,utilisateur.prenom as utilisateur,cast (date as time) as time from temps_passe,utilisateur where utilisateur.id=temps_passe.utilisateur and temps_passe.activite in (select id from activites where '.$_GET[methode].'='.$_GET[id].')';
	
	
    $req = $conn->prepare($sql);
    $req->execute();



  $data = array();
      while($row=$req->fetch(PDO::FETCH_ASSOC)){

        $data['data'][] = $row;

  }


  echo json_encode($data);

?>
