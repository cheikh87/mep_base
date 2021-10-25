$(document).ready(function() {
	
var couche = $('#couche_courant').val();
$(".page-title").html(couche);

var dictionnaire=get_dictionnaire(couche);

dictionnaire=JSON.parse(dictionnaire);


//paramétrage des templates pour la légende

if(dictionnaire[0].type_geom==="POINT" || dictionnaire[0].type_geom==="MULTIPOINT")
{
$("#new_s_b").show();	
	
	 $("#type_style").html(''+
                '<input type="file" name="file1_" id="file1_"><br>'+
                '<progress id="progressBar_" value="0" max="100" style="width:300px;"></progress> '+               
                 '<span id=""></span>'+
                '<h3 id="status_"></h3>'+
                '<p id="loaded_n_total_"></p>'+                
              '')	
}

else
{
	$("#new_s_b").hide();	
	
	 $("#type_style").html(''+
							'<div class="form-group">'+
                           '<label for="input-13">Couleur de légende</label>'+
                '<input type="color" name="styles" id="styles"><br>'+   
  '</div>'+
							'<div class="form-group">'+
                           '<label for="input-13">Bordure</label>'+
                '<select name="bordure" id="bordure"><option value="">trait plain (-)</option><option value="Dasharray">Tireté (--)</option></select>'+   
  '</div>'+
  '<div class="form-group">'+
                           '<label for="input-13">Taille bordure</label>'+
                '<input type="number" name="taille" id="taille" size="3">'+   
  '</div>')
}



	$("#table_head").html("<th>Action</th>");
	$("#form_add").html(" <input id='gid' name='gid' type='hidden'>");
	

var list_champ=[];
var list_colonne=[];
var list_type_champ=[];
var table_et_type={};
list_colonne.push(  {
            "data": "",
            "render": function (data) {
                var bouton_modifier = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="modifier" class="btn-warning modifier"><i class="fa fa-edit"></i></button>';
                var bouton_supprimer = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="supprimer" class="btn-danger supprimer"><i class="fa fa-trash"></i></button>';
                var bouton_zone_interv = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="Zone d\'intervention" class="btn-success intervention"><i class="fa fa-map"></i></button>'; 
                    return '<div style="font-size:10px;" align="center">'+
                       bouton_modifier+bouton_supprimer
                    +'</div>';
               
            }
        }
		)
		
 for(var k=0;k<dictionnaire.length;k++)
                {
					
					$("#table_head").append("<th>"+dictionnaire[k].definition+"</th>");
					$("#form_add").append('<div class="form-group">'+
					  '<label for="input-13">'+dictionnaire[k].definition+'</label>'+
					  '<textarea  class="form-control form-control-square" id="'+dictionnaire[k].nom_colonne+'" name="'+dictionnaire[k].nom_colonne+'" placeholder="'+dictionnaire[k].definition+'"></textarea>'+
					 '</div>');
					
					list_champ.push(dictionnaire[k].nom_colonne);
					list_colonne.push({data:dictionnaire[k].nom_colonne});
					list_type_champ.push(dictionnaire[k].data_type);
					table_et_type[dictionnaire[k].nom_colonne]=dictionnaire[k].data_type;
					//table_et_type.push();
					
					
					$("#colonne").append('<option value="'+dictionnaire[k].nom_colonne+'">'+dictionnaire[k].definition+'</option>');
                }
				
				$("#type_geom").val(dictionnaire[0].type_geom);
				
				function param_nature_champ()
				{
				$('#symbole').empty();
				var colonne_champ=$("#colonne").val();
				var type_colone=table_et_type[colonne_champ];
				
				if(type_colone==="double precision" || type_colone==="integer" || type_colone==="numeric")
				{
				$("#titre_champ_select").html($('#colonne option:selected').text());
				$("#symbole").append("<option value='='>=</option> <option value='<'><</option> <option value='>'>></option>");
				$("#definition_valeur").html("<input type='number' id='valeurs' name='valeurs' size='5'  step='0.001'>");
				$("#type_valeur").val("nombre");
			
				}
				
				else 
					
				{
				$("#titre_champ_select").html($('#colonne option:selected').text());
				
				$("#symbole").append("<option value='='>=</option>");
				$("#definition_valeur").html("<select id='valeurs' name='valeurs'> </select><span class='loader'></span>");
				
				var MesValeus=get_value_legende(couche,colonne_champ);
				
				console.log(MesValeus);
				
				$('#valeurs').empty();
				$('#valeurs').append(MesValeus);
	
				$("#type_valeur").val("text");
				}
				
				}
				  
param_nature_champ();
$("#type_param").hide();	

$('#colonne').on('change', function (e) {
	param_nature_champ();	
	  } );
			
$('#type_legende').on('change', function (e) {
	if($('#type_legende').val()==="Autre") $("#type_param").show();
	else  $("#type_param").hide();
	  } );
			
				var geometry_type=dictionnaire[0].type_geom;
//dic= _.map(dictionnaire, 'nom_colonne');
var table = $('#table_activites').DataTable( {
    lengthChange: false,
     responsive: true,
     language: {
                "url": "assets/i18n/datatable.json"
        },
dom: 'Bfrtip',
   buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ],
   
   ajax: {
        "url": 'api/get_donnees_table.php',
		 "type": "POST",
		 "data":{"liste_champ":list_champ,"table":couche}
    },
    buttons: [ 'excel', 'pdf', 'colvis' ],
    columns: list_colonne
    
  } );

  //table.ajax.reload();
  

  
  
  var table_legende = $('#table_legendes').DataTable( {
    lengthChange: false,
     responsive: true,
     language: {
                "url": "assets/i18n/datatable.json"
        },
dom: 'Bfrtip',
   buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ],
   
   ajax: {
        "url": 'api/get_donnees_legendes.php',
		 "type": "POST",
		 "data":{"table":couche}
    },
    buttons: [ 'excel', 'pdf', 'colvis' ],
   columns: [
       
       {
            "data": "",
            "render": function (data) {
                var bouton_modifier = '&nbsp;<button data-toggle="tooltip" id="Locid" data-placement="left" title="modifier" class="btn-warning modifier"><i class="fa fa-edit"></i></button>';
                var bouton_supprimer = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="supprimer_legende" class="btn-danger supprimer_legende"><i class="fa fa-trash"></i></button>';
                var bouton_zone_interv = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="Zone d\'intervention" class="btn-success intervention"><i class="fa fa-map"></i></button>'; 
                    return '<div style="font-size:10px;" align="center">'+
                      bouton_supprimer
                    +'</div>';
               
            }
        },
		 {"data": "nom_legende"},
        {"data": "valeurs",
		"render": function (data,type, row) {
			
			if(data)
			{
				if(row.type_legende!=='default')
				{
			//$("#type_legende").val("Autre");
			///$('#type_legende').attr("disabled", true); 	
			//$('#colonne').attr("disabled", true);	
			$('#colonne').empty();
			$("#colonne").append("<option value='"+row.colonne+"'>"+row.colonne+"</option>");
			
			param_nature_champ();
				}
			
			}
			
			
               
			       if(row.type_legende==="default")
                    return '<div><a class="modifier">Légende par défaut</a></div>';
				else
                return '<div><a class="modifier">'+row.symbole+' '+row.valeurs+'</a></div>';
               
            }
		
		},
		{"data": "styles",
		"render": function (data,type, row) {
               
			       if(row.type_geom==="POINT" || row.type_geom==="MULTIPOINT")
                    return '<img src="../images/legendes/'+row.styles+'" width="25px" height="25px">';
				else
                return '<div style="width:25px;height:25px;background:'+row.styles+'"></div>';
               
            }
		
		}

    ],
    
  } );



 var table_dictionnaire = $('#table_dictionnaires').DataTable( {
    lengthChange: false,
     responsive: true,
     language: {
                "url": "assets/i18n/datatable.json"
        },
dom: 'Bfrtip',
   buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ],
   
   data:dictionnaire,
    buttons: [ 'excel', 'pdf', 'colvis' ],
   columns: [
       
       {
            "data": "",
            "render": function (data) {
                var bouton_modifier = '&nbsp;<button data-toggle="tooltip" id="Locid" data-placement="left" title="modifier_dict" class="btn-warning modifier_dict"><i class="fa fa-edit"></i></button>';
                var bouton_supprimer = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="supprimer_legende" class="btn-danger supprimer_legende"><i class="fa fa-trash"></i></button>';
                var bouton_zone_interv = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="Zone d\'intervention" class="btn-success intervention"><i class="fa fa-map"></i></button>'; 
                    return '<div style="font-size:10px;" align="center">'+
                      bouton_modifier
                    +'</div>';
               
            }
        },
		 {"data": "definition"},
		 {"data": "popup_view",
		"render": function (data,type, row) {
			
			if(data===true)
			   return '  <i class="fa fa-check" style="color:green"></i>';
				else
                return '<i class="fa fa-trashsss" style="color:red">x</i>';
			 
            }
		
		},
		 {"data": "label_view",
		"render": function (data,type, row) {
			
			if(data===true)
			    return '  <i class="fa fa-check" style="color:green"></i>';
				else
                return '<i class="fa fa-trashss" style="color:red">x</i>';
			 
            }
		
		}
		

    ],
    
  } );


$('#add_legende').on('click', function (e) {
   
   if($("#type_geom").val()==="POINT" || $("#type_geom").val()==="MULTIPOINT")
	   insert_legende_point();
   
   else

    insert_legende_poly();
	   
});


$('#new_s_').on('click', function (e) {
   
    $('.title_activity').text('Ajout de nouvelles données');
    $('#edit_').hide();
    $('#add_').show(); 
    //$('#new_s').modal('show');  
    $('#new_s_import').modal('show');
    resizeMymap();   
});

$('#new_s_b').on('click', function (e) {
   
    $('.title_activity').text('Ajout de nouvelles données');
    $('#lat_ling').html(' <div class="form-group">'+
					  '<label for="input-15">Coordonnées (dégré décimal)</label><br>'+
					   '<b style="color:red">*</b> lon: <input type="number" step="0.00000001" class="form-control-square" size="5" id="lon" name="lon" placeholder="Longitude"> <b style="color:red">*</b> lat: <input type="number" step="0.00000001" class="form-control-square" size="5" id="lat" name="lat" placeholder="Latitude">'+
					 '</div>');
    $('#edit_').hide();
    $('#add_').show(); 
    $('#new_s').modal('show');  
    resizeMymap();   
});

$('#add_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

    var s_json=$('#form_add').serializeFormJSON();

    var s = $('#form_add').serializeFormJSON();
    s.table=couche;
	// s.lon=$("#lon").val();
	// s.lat=$("#lat").val();
    //s.utilisateur=id_user;
    //console.log(s);
	
	if ($("#lon").val() == 0) {
          alert("Vous devez donner la longitude");
		  document.getElementById('lon').style.border = '2px solid red';
          return false;
          }	 
		  
		  if ($("#lat").val() == 0) {
          alert("Vous devez donner la latitude");
		  document.getElementById('lat').style.border = '2px solid red';
          return false;
          }	

    var pt = turf.point([$('#lon').val(),$('#lat').val()]);
    var crs ={"type":"name","properties":{"name":"EPSG:4326"}};
    pt.geometry.crs=crs;
    pt.geometry.type=dictionnaire[0].type_geom;
	if(pt.geometry.type==="POINT" || pt.geometry.type==="Point" || pt.geometry.type==="point")
		pt.geometry.coordinates=pt.geometry.coordinates;
	else
    pt.geometry.coordinates=[pt.geometry.coordinates];
//var converted = turf.toMercator(pt);
console.log(pt);
s.shape=pt.geometry;
    
    
    $.ajax({
            url:'api/ajouter.php',
            type: 'POST',
            "content-type": "application/json",
            "cache-control": "no-cache",
            data: s,
            success: function (result) {
                    
                    
                    notification('success',result.message, 'fa fa-check-circle');
                    get_carte_infras(s.up,'*');
         
                    $("#form_add_i")[0].reset();
                    $('#zone_inter_modal').modal('hide');
                   // table.ajax.reload();

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });

           });






$('#ajout_champ').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

    var s = $('#form_champ').serializeFormJSON();
    s.nom_table=couche;
	s.table="dictionnaire";
	s.definition=s.nom_colonne;
	// s.lon=$("#lon").val();
	// s.lat=$("#lat").val();
    //s.utilisateur=id_user;
    console.log(s);
	
	
    
    $.ajax({
            url:'api/ajouter_champ.php',
            type: 'POST',
            "content-type": "application/json",
            "cache-control": "no-cache",
            data: s,
            success: function (result) {
                    
                    
                    notification('success',result.message, 'fa fa-check-circle');
                    
					 $('#dictionnaire_champ').modal('hide');
					var dictionnaire=get_dictionnaire(couche);

dictionnaire=JSON.parse(dictionnaire);

                table_dictionnaire.clear().draw();
			    table_dictionnaire.rows.add(dictionnaire); // Add new data
			    table_dictionnaire.columns.adjust().draw(); // Redraw the DataTable

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });

           });






//Modifier une valeur
$('#table_activites tbody').on('click', '.modifier', function (e) {
    e.preventDefault();
    
    $('.title_activity').text('Modifier un élément');
   
    $('#edit_').show();
    $('#add_').hide();

    var data = table.row($(this).parents('tr')).data();
	
	
	
	console.log(data);
  for(var i=0;i<dictionnaire.length;i++)
                {
					
					$('#'+dictionnaire[i].nom_colonne).val(data[dictionnaire[i].nom_colonne]);
				}
    $('#gid').val(data.gid);

    $('#new_s').modal('show');
});  


$('#edit_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#form_add').serializeFormJSON();

    var s = $('#form_add').serializeFormJSON();
    s.table=couche;
    //s.utilisateur=id_user;
    console.log(s);
    
    
    $.ajax({
            url:'api/modifier.php',
            type: 'POST',
            "content-type": "application/json",
            "cache-control": "no-cache",
            data: s,
            success: function (result) {
                    
                    
                    notification('success',result.message, 'fa fa-check-circle');
         
                    $("#form_add")[0].reset();
                    $('#new_s').modal('hide');
                    table.ajax.reload();

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });

           });
		   
		   
		   
//Modifier dictionnaire
//Modifier une valeur
$('#table_dictionnaires tbody').on('click', '.modifier_dict', function (e) {
    e.preventDefault();

    var data = table_dictionnaire.row($(this).parents('tr')).data();

   $('#gid_dict').val(data.gid);
   $('#nom_champs').html(data.definition);
   $('#name_champ_').html("<input class='form-control form-control-square' type='text' name='definition' value='"+data.definition+"'>");
   
   if(data.label_view==true)
	    $('input:checkbox[name=label_view]').attr('checked',true);
	else
		 $('input:checkbox[name=label_view]').attr('checked',false);
	 
	  if(data.popup_view==true)
	    $('input:checkbox[name=popup_view]').attr('checked',true);
	else
		 $('input:checkbox[name=popup_view]').attr('checked',false);

    $('#dictionnaire_modal').modal('show');
});  

$('#mod_dict').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#form_dictionnaire').serializeFormJSON();

    var s = $('#form_dictionnaire').serializeFormJSON();
    s.table="dictionnaire";
    //s.utilisateur=id_user;
	if(s.popup_view==="on") s.popup_view=true; else s.popup_view=false;
	if(s.label_view==="on") s.label_view=true; else s.label_view=false;
    console.log(s);
    

    
    $.ajax({
            url:'api/modifier_dict.php',
            type: 'POST',
            "content-type": "application/json",
            "cache-control": "no-cache",
            data: s,
            success: function (result) {
                    
                    
                    notification('success',result.message, 'fa fa-check-circle');
         
                   
                    $('#dictionnaire_modal').modal('hide');
					var dictionnaire=get_dictionnaire(couche);

dictionnaire=JSON.parse(dictionnaire);

                table_dictionnaire.clear().draw();
			    table_dictionnaire.rows.add(dictionnaire); // Add new data
			    table_dictionnaire.columns.adjust().draw(); // Redraw the DataTable
			   

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });

           });
		   



// supprimer une valeur
$('#table_activites tbody').on('click', '.supprimer', function (e) {
    e.preventDefault();
    var data = table.row($(this).parents('tr')).data();
    $('.title2').html('<span style="color:blue">Suppression d\'un élément: </span> ');
    $('.confirm_action').html("confirmer la suppression <span style='color:red'>");
    $('#gid_sup').val(data.gid);
    $('#confirm_modal').modal('show');
});      



$('#delete_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#sup_element').serializeFormJSON();

    var s = $('#sup_element').serializeFormJSON();
    s.table=couche;
   
    
    $.ajax({
            url:'api/supprimer.php',
            type: 'POST',
            "content-type": "application/json",
            "cache-control": "no-cache",
            data: s,
            success: function (result) {
                    
                    
                    notification('success',result.message, 'fa fa-check-circle');
         
                    $("#sup_element")[0].reset();
                    $('#confirm_modal').modal('hide');
                    table.ajax.reload();

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });

           });



$('#table_legendes tbody').on('click', '.supprimer_legende', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

 var data = table_legende.row($(this).parents('tr')).data();
    var s =
	{
	table:'legendes',
	gid:data.gid};
	
    
    
    $.ajax({
            url:'api/supprimer.php',
            type: 'POST',
            "content-type": "application/json",
            "cache-control": "no-cache",
            data: s,
            success: function (result) {
                    
                    
                    notification('success',result.message, 'fa fa-check-circle');
         
                    
                    table_legende.ajax.reload();

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });

           });


// Zone d'intervention
$('#table_activites tbody').on('click', '.intervention', function (e) {
    e.preventDefault();
    var data = table.row($(this).parents('tr')).data();
    
    $('.title3').html('<span style="color:blue">Gestion des infrastructures de l\'UP</span> '+data.nom);
    $('#zone_inter_modal').data('up', data.gid);
    $('#zone_inter_modal').modal('show');
    $('#up').val( data.gid);

    setTimeout(function(){ map.invalidateSize()}, 400);

   

    get_carte_infras(data.gid,"*");

    

/*
    var mesUnites=get_entites("regions","regions");
    $('#regions').empty();
    $('#regions').append(mesUnites);

    **/

    

   // zone_de_projets(data.gid,"*");
    
});  

$('#zone_inter_modal').on('show.bs.modal', function(){
    setTimeout(function() {
      map.invalidateSize();
    }, 5);
   });



function insert_legende_point()
{

uploadFile_();	
	
}



function uploadFile_() {
    var file = _("file1_").files[0];
    // alert(file.name+" | "+file.size+" | "+file.type);
    nom_fichier=file.name;
    var formdata = new FormData();
    formdata.append("file1", file);
    var ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler_, false);
    ajax.addEventListener("load", completeHandler_, false);
    ajax.addEventListener("error", errorHandler_, false);
    ajax.addEventListener("abort", abortHandler_, false);
    
    ajax.open("POST", "api/upload_legende.php"); // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
    //use file_upload_parser.php from above url
    ajax.send(formdata);
	
	
  }
  
  function progressHandler_(event) {
   // _("loaded_n_total").innerHTML = "Les données ont été ajoutées !";
    var percent = (event.loaded / event.total) * 100;
    _("progressBar_").value = Math.round(percent);
    _("status_").innerHTML = Math.round(percent) + "% chargement... veuillez attendre";
  }
  
  function completeHandler_(event) {
    //_("status_").innerHTML = event.target.responseText;
    _("progressBar_").value = 0; //wil clear progress bar after successful upload
      charger_legende(event.target.responseText);
      $("#description_du_doc_").html('');
  }
  
  function errorHandler_(event) {
    _("status_").innerHTML = "Upload Failed";
  }
  
  function abortHandler_(event) {
    _("status_").innerHTML = "Upload Aborted";
  }
  
  
  
  function charger_legende(styles)
  {
	var s_json=$('#form_legende').serializeFormJSON();
	var couche = $('#couche_courant').val();
s_json.nom_table=couche;
s_json.table="legendes";
s_json.styles=styles;

	
if($("#type_legende").val()==="default"	)
{
s_json.symbole="0";
s_json.valeurs="0";
s_json.priorite=1;			
}


if(s_json.type_legende==="Autre" && s_json.valeurs==='')
{
	alert("vous devez mettre une valeur");
	return false;
}



 $.ajax({
            url:'api/ajouter.php',
            type: 'POST',
            "content-type": "application/json",
            "cache-control": "no-cache",
            data: s_json,
            success: function (result) {
                    
                    
                    notification('success',result.message, 'fa fa-check-circle');
                    table_legende.ajax.reload();
                    $("#form_legende").reset();
                    

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });  
	  
  }






function insert_legende_poly()
{

var s_json=$('#form_legende').serializeFormJSON();
s_json.nom_table=couche;
s_json.table="legendes";

	
if($("#type_legende").val()==="default"	)
{
s_json.symbole="0";
s_json.valeurs="0";
s_json.priorite=1;			
}






 $.ajax({
            url:'api/ajouter.php',
            type: 'POST',
            "content-type": "application/json",
            "cache-control": "no-cache",
            data: s_json,
            success: function (result) {
                    
                    
                    notification('success',result.message, 'fa fa-check-circle');
                    table_legende.ajax.reload();
                    $("#form_legende").reset();
                 

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });  
	
}	
	
	


        });

        function enregistrer_zone_projet(unite,id_entite){


            var s={
                id_projet:$('#zone_inter_modal').data('id_projet'),
                id_entite:id_entite,
                entites:unite,
                table:"zone_intervention_projet"
            }
                $.ajax({
                    url:'api/ajouter.php',
                    type: 'POST',
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    data: s,
                    success: function (result) {
                            
                       
                        
                            notification('success',result.message, 'fa fa-check-circle');
                            zone_de_projets($('#zone_inter_modal').data('id_projet'),"*")
                            //$("#sup_element")[0].reset();
                            $('#confirm_modal').modal('hide');
                           // table.ajax.reload();
            
                    },
                    error: function (result) {
                    console.log(result);
                            notification('error', result.responseJSON.message, 'fa fa-times-circle');
                            $("#loader_").html("");
                    }
            });
            
            }        


            var highlightStyle = {
                "color": "#5F9EA0",
                "weight": 3,
                "opacity": 0.9,
                "fillOpacity": 1,
                "fillColor": "white"
            };
            var couleur_entites={"regions":"red","departements":"blue","communes":"yellow"};            

 function Style_par_defaut_p(feature) {
return {color: couleur_entites[feature.type_entite],fillColor:couleur_entites[feature.type_entite],weight:3,fillOpacity: 0.6,opacity: 0.9,radius:8};
          
    }
            
            // Define what happens to each polygon just before it is loaded on to
            // the map. This is Leaflet's special way of goofing around with your
            // data, setting styles and regulating user interactions.
            var onEachFeature = function (feature, layer) {
            
                var out = [];
                var out2 = [];
                if (feature.properties) {
                    for (key in feature.properties) {
        
                        if (dictionnaire[key]) {
                        
                            out.push("<tr><td><b>" + dictionnaire[key] + ":</b></td> <td>" + feature.properties[key] + "</td>");
                          //  out2.push(dictionnaire[key] + ": " + feature.properties[key]);
                            
                        }
                        
                         if (dictionnaire_view[key]) {
                        
                            //out.push("" + dictionnaire[key] + ": " + feature.properties[key] + "");
                            out2.push(dictionnaire_view[key] + ": " + feature.properties[key]);
                            
                        }
                    }
                    layer.bindPopup("<table><caption>Informations</caption><tbody>"+out+("</tbody></table>"));
                    layer.bindTooltip(out2.join("<br />"));
                }
                // Load the default style.
               //layer.setStyle(Style_par_defaut(feature.properties));
                // Create a self-invoking function that passes in the layer
                // and the properties associated with this particular record.
                (function (layer, properties) {
                    // Create a mouseover event
                    layer.on("mouseover", function (e) {
                        // Change the style to the highlighted version
                        layer.setStyle(highlightStyle);
                        // Create a popup with a unique ID linked to this record
        
                        // Insert a headline into that popup
                    });
                    // Create a mouseout event that undoes the mouseover changes
                    layer.on("mouseout", function (e) {
                        // Start by reverting the style back
                     layer.setStyle(Style_par_defaut(feature.properties));
                        // And then destroying the popup
        
                    });
                    // Close the "anonymous" wrapper function, and call it while passing
                    // in the variables necessary to make the events work the way we want.
                })(layer, feature.properties);
            };


var dictionnaire={"nom":"Nom de l'entité"};
            // Define what happens to each polygon just before it is loaded on to
    // the map. This is Leaflet's special way of goofing around with your
    // data, setting styles and regulating user interactions.
    var onEachFeature_p = function (feature, layer) {
        var out = [];
        var out2 = [];
       
        if (feature.properties) {
            for (key in feature.properties) {

                if (key != 'gid') {
				if( dictionnaire[key])
				{
                    out.push("" + dictionnaire[key] + ": " + feature.properties[key] + "");
                    out2.push(dictionnaire[key] + ": " + feature.properties[key]);
					}
                }


                if(key==="type_entite")
                $("#elem_"+feature.properties[key]).append('<tr><td> <i onclick="delete_zone('+feature.properties["gid"]+')" style="color:red;cursor:pointer" class="fa fa-trash"></i> '+feature.properties["nom"]+' </td></tr>');

            }
            layer.bindPopup(out.join("<br />"));
            layer.bindTooltip(out2.join("<br />"));
        }
        // Load the default style.
       layer.setStyle(Style_par_defaut_p(feature.properties));
        // Create a self-invoking function that passes in the layer
        // and the properties associated with this particular record.
        (function (layer, properties) {
            
            // Create a mouseover event
            layer.on("mouseover", function (e) {
                // Change the style to the highlighted version
                layer.setStyle(highlightStyle);
                // Create a popup with a unique ID linked to this record

                // Insert a headline into that popup
            });
            // Create a mouseout event that undoes the mouseover changes
            layer.on("mouseout", function (e) {
                // Start by reverting the style back
             layer.setStyle(Style_par_defaut_p(feature.properties));
                // And then destroying the popup

            });
            // Close the "anonymous" wrapper function, and call it while passing
            // in the variables necessary to make the events work the way we want.
        })(layer, feature.properties);
    };
	

        
              var highlightStyle = {
                color: '#2262CC',
                weight: 2,
                opacity: 0.6,
                fillOpacity: 0.65,
                fillColor: '#2262CC'
              };
        
        
                var map= L.map('map').setView([14.6, -14.6], 7);
        
               var zone_interv = L.featureGroup();
          
        
            // OSM layers
                    var osmUrl='http://{s}.tile.osm.org/{z}/{x}/{y}.png';
                    var osmAttrib='';
                    var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});
        
            var url_serveur="http://213.154.74.35:8080";
        
                     var fond = L.tileLayer.wms(url_serveur+"/geoserver/wms", {
                                layers:  'praps:regions',
                               // <!-- cql_filter:"denomination='Région'", -->
                                format: 'image/png',
                                transparent: true,
                                visible: true,
                                isBaseLayer: false
                            });
        
         map.addLayer(fond);

         var geo1 = L.geoJson({features:[]},{onEachFeature:function popUp(f,l){
            var out = [];
            if (f.properties){
                for(var key in f.properties){
                out.push(key+": "+f.properties[key]);
        }
        l.bindPopup(out.join("<br />"));
        }
        }}).addTo(map);

        var baseMaps = [
                                    {
                                        groupName : "Fond de carte",
                                        expanded : true,
                                        layers    : {
        
                                            "OpenStreetMaps" : fond
                                        }
                                    }
                    ];
        
                    var overlays = [
        
        
                                     {
                                        groupName : "Entités administratives",
                                        expanded : true,
                                        layers    : {
                                            "Zone intervention"     :  zone_interv
        
                                        }
                                     }
        
        
        
        
                    ];
        
        
        
        
        // configure StyledLayerControl options for the layer Zone géographique
        zone_interv.StyledLayerControl = {
                        removable : false,
                        visible : true
                    }
        
        
        
                    var options = {
                        container_width 	: "300px",
                        group_maxHeight     : "80px",
                        //container_maxHeight : "350px",
                        exclusive       	: false,
                        collapsed : true,
                        position: 'topright'
                    };
        
                    var control = L.Control.styledLayerControl(baseMaps, overlays,options);
                    map.addControl(control);
        
        control.selectLayer(zone_interv);

        var htmlLegend1 = L.control.htmllegend({
            position: 'bottomright',
            legends: [{
                name: 'Type entité',
                layer: zone_interv,
                elements: [{
                    label: 'Région',
                    html: '',
                    style: {
                        "background-color": "red",
                        "width": "10px",
                        "height": "10px"
                    }
                }, {
                    label: 'Département',
                    html: '',
                    style: {
                        "background-color": "blue",
                        "width": "10px",
                        "height": "10px"
                    }
                }, {
                    label: 'Commune',
                    html: '',
                    style: {
                        "background-color": "yellow",
                        "width": "10px",
                        "height": "10px"
                    }
                }]
            }],
            collapseSimple: true,
            detectStretched: true,
            collapsedOnInit: true,
            defaultOpacity: 0.7,
            visibleIcon: 'icon icon-eye',
            hiddenIcon: 'icon icon-eye-slash'
        });
    
      //  map.addControl(htmlLegend1);


       
function zone_de_projets(id_projet,entite)
{
    $("#elem_regions").html("");
    $("#elem_departements").html("");
    $("#elem_communes").html("");  
    $("#chargement_zone").html('<img src="img/loader.gif">');
      
        var geojsonLayer=new L.GeoJSON.AJAX("api/zone_intervention_projet.php?id_projet="+id_projet+"&entite="+entite, {
          onEachFeature: onEachFeature_p
             });
             
            
        
        
             geojsonLayer.on('data:loaded', function() {
                zone_interv.clearLayers();
                geojsonLayer.addTo(zone_interv);
                map.fitBounds(geojsonLayer.getBounds());
        
        $("#zone_intervention_projet").html("Zone d'intervention :"+geojsonLayer.getLayers().length);
        $("#chargement_zone").html('');
        }.bind(this));
                   
} 

function delete_zone(gid){

    var s = {
        gid:gid,
        table:"zone_intervention_projet"
    };
    
   
    
    $.ajax({
            url:'api/supprimer.php',
            type: 'POST',
            "content-type": "application/json",
            "cache-control": "no-cache",
            data: s,
            success: function (result) {
                    
                    
                    notification('success',result.message, 'fa fa-check-circle');
                    zone_de_projets($('#zone_inter_modal').data('id_projet'),"*")
                   

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });

}


//Map importaion

var map2= L.map('map2').setView([14, -14], 5);
var osmUrl='http://{s}.tile.osm.org/{z}/{x}/{y}.png';
var osmAttrib='';
var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});


// Intégration des plugins
map2.addLayer(osm);

var geo = L.geoJson({features:[]},{onEachFeature:function popUp(f,l){
    var out = [];
    if (f.properties){
        for(var key in f.properties){
        out.push(key+": "+f.properties[key]);
}
l.bindPopup(out.join("<br />"));
}
}}).addTo(map2);


function resizeMymap(){
    setTimeout(function(){ map2.invalidateSize()}, 400);
}


//importations

var nom_fichier;
function _(el) {
  return document.getElementById(el);
}

function uploadFile() {
  var file = _("file1").files[0];
  // alert(file.name+" | "+file.size+" | "+file.type);
  nom_fichier=file.name;
  var formdata = new FormData();
  formdata.append("file1", file);
  var ajax = new XMLHttpRequest();
  ajax.upload.addEventListener("progress", progressHandler, false);
  ajax.addEventListener("load", completeHandler, false);
  ajax.addEventListener("error", errorHandler, false);
  ajax.addEventListener("abort", abortHandler, false);
  
  ajax.open("POST", "api/upload.php"); // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
  //use file_upload_parser.php from above url
  ajax.send(formdata);
}

function progressHandler(event) {
 // _("loaded_n_total").innerHTML = "Les données ont été ajoutées !";
  var percent = (event.loaded / event.total) * 100;
  _("progressBar").value = Math.round(percent);
  _("status").innerHTML = Math.round(percent) + "% chargement... veuillez attendre";
}

function completeHandler(event) {
  _("status").innerHTML = event.target.responseText;
  _("progressBar").value = 0; //wil clear progress bar after successful upload
	charger_shape(nom_fichier);
	$("#description_du_doc").html('');
}

function errorHandler(event) {
  _("status").innerHTML = "Upload Failed";
}

function abortHandler(event) {
  _("status").innerHTML = "Upload Aborted";
}





function charger_shape(shape)
{
	
var couche = $('#couche_courant').val();
var dictionnaire=get_dictionnaire(couche);
dictionnaire=JSON.parse(dictionnaire);
var list_champ=[];
var list_colonne=[];
var list_type_champ=[];

 for(var k=0;k<dictionnaire.length;k++)
                {
					
				
					list_colonne.push(dictionnaire[k].nom_colonne);
					list_type_champ.push(dictionnaire[k].data_type);
                }
				
				var geometry_type=dictionnaire[0].type_geom;	

      var base = 'api/zip/'+shape;
		shp(base).then(function(data){
		
		var colonne_shape=[];
		$.each(data.features[0].properties, function(key) { 
			colonne_shape.push(key);
		  });

 
		
		//geo.addData(data);
		var src={"type":"name","properties":{"name":"EPSG:4326"}};
		
		var obj =  {
            "shape": data,
			"list_colonne": list_colonne,
			"list_type_champ":list_type_champ,
			"geometry_type":geometry_type,
			"colonne_shape":colonne_shape,
			"table":couche
          }
		  
		  console.log(data);
   
 

        obj = JSON.stringify(obj)
        
        $.ajax({
          url:'api/insertion_zone.php',
          type: 'POST',
         contentType : 'application/json; charset=UTF-8',
          data:obj ,
          success: function (result) {
                    
                    
            notification('success',result.message, 'fa fa-check-circle');
 
            $("#upload_form")[0].reset();
            $('#new_s_import').modal('hide');
            table.ajax.reload();

    },
    error: function (result) {
    console.log(result);
            notification('error', result.responseJSON.message, 'fa fa-times-circle');
            $("#loader_").html("");
    }
        });
		
		
		});

}



function charger_shape_(shape)
{

      var base = 'api/zip/'+shape;
      
		shp(base).then(function(data){
		console.log(base);
		
		geo1.addData(data);
        var src={"type":"name","properties":{"name":"EPSG:4326"}};
        
       
		
		var obj =  {
            "shape": data,
            "up": $('#zone_inter_modal').data('up')
          }
   
         

        obj = JSON.stringify(obj)
        
        $.ajax({
          url:'api/insertion_infras.php',
          type: 'POST',
          contentType : 'application/json; charset=UTF-8',
          data:obj ,
          success: function (result) {
                    
                    
            notification('success',result.message, 'fa fa-check-circle');
            get_carte_infras($('#zone_inter_modal').data('up'),'*');
 
            $("#upload_form_")[0].reset();
           // $('#new_s_import_').modal('hide');
           // table.ajax.reload();

    },
    error: function (result) {
    console.log(result);
            notification('error', result.responseJSON.message, 'fa fa-times-circle');
            $("#loader_").html("");
    }
        });
		
		
		});

}




var table_i = $('#table_infrastructures').DataTable( {
    lengthChange: false,
     responsive: true,
     language: {
                "url": "assets/i18n/datatable.json"
        },
dom: 'Bfrtip',
data: [],
    columns: [
        {
            "data": "",
            "render": function (data) {
                var bouton_modifier = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="modifier" class="btn-warning modifier"><i class="fa fa-edit"></i></button>';
                var bouton_supprimer = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="supprimer" class="btn-danger supprimer"><i class="fa fa-trash"></i></button>';
                var bouton_zone_interv = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="Zone d\'intervention" class="btn-success intervention"><i class="fa fa-map"></i></button>'; 
                    return '<div style="font-size:10px;" align="center">'+
                       bouton_modifier+bouton_supprimer
                    +'</div>';
               
            }
        },
        {"data": "properties.nom"},
        {"data": "properties.type"},
        {"data": "properties.etat"}

    ],
    
  } );


function get_carte_infras(up,type){
    var liste_infras=get_liste_infras(up,type);

    var donnees=get_liste_infras(up,type);
            donnees=donnees.features;
            table_i.clear().draw();
	        table_i.rows.add(donnees); // Add new data
	        table_i.columns.adjust().draw(); // Redraw the DataTable
				//	table.reload();

    console.log(liste_infras);
    var geojsonLayer=new L.geoJson(liste_infras, {
        onEachFeature: onEachFeature_p,
        pointToLayer: function (feature, coordinates) {
          return L.circleMarker(coordinates)
        }
           });

           zone_interv.clearLayers();
           geojsonLayer.addTo(zone_interv);
           //map.fitBounds(geojsonLayer.getBounds());

          
}
	  

