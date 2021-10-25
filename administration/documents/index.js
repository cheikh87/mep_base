$(document).ready(function() {
	
	

var table = $('#table_activites').DataTable( {
    lengthChange: false,
     responsive: true,
     language: {
                "url": "assets/i18n/datatable.json"
        },
dom: 'Bfrtip',
   buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ],
   
   ajax: {
        "url": 'api/get_document.php'
    },
    buttons: [ 'excel', 'pdf', 'colvis' ],
    columns: [
        {
            "data": "",
            "render": function (data) {
                var bouton_modifier = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="modifier" class="btn-warning modifier"><i class="fa fa-edit"></i></button>';
                var bouton_supprimer = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="supprimer" class="btn-danger supprimer"><i class="fa fa-trash"></i></button>';
               // var bouton_zone_interv = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="Zone d\'intervention" class="btn-success intervention"><i class="fa fa-map"></i></button>'; 
                    return '<div style="font-size:10px;" align="center">'+
                       bouton_modifier+bouton_supprimer
                    +'</div>';
               
            }
        },
        {"data": "nom_document"},
        {"data": "description"},
        {"data": "nom_document",
		
		"render": function (data) {
                
                    return '<div style="font-size:10px;" align="center"> <iframe style="width:100%;height:90px" src="../documents/'+data+'"></iframe></div>';
               
            }
		
		}

    ],
    
  } );

  //table.ajax.reload();


//Fonction qui déclenche le popup d'ajout de nouvelles valeurs

$('#new_s_').on('click', function (e) {

    $("#import_file").show();
  

    $('.title_activity').text('Ajout de nouvelles données');
    $('#edit_').hide();
    $('#add_').show(); 
    $('#new_s').modal('show');   
	
	/*
	  var mesTypes=get_types();
    $('#type_doc').empty();
    $('#type_doc').append(mesTypes);
	
	*/
});

$('#add_').on('click', function (e) {
    e.preventDefault();

    var file = _("nom_document").files[0];
        // alert(file.name+" | "+file.size+" | "+file.type);
        nom_fichier=file.name;
       //var description=$("#description").val();
       var type_doc=$("#type_doc").val();
        var formdata = new FormData();
        formdata.append("file1", file);
        var ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
      
        
        
        ajax.open("POST", "api/upload2.php?description="+type_doc+"&type_doc=type_"+type_doc); // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
        //use file_upload_parser.php from above url
        ajax.send(formdata);
       
        
        function progressHandler(event) {
            _("loaded_n_total").innerHTML = "Chargement du fichier effectué";
            var percent = (event.loaded / event.total) * 100;
            _("progressBar").value = Math.round(percent);
            _("status").innerHTML = Math.round(percent) + "% chargement... veuillez attendre";
          }
          
          function completeHandler(event) {
            _("status").innerHTML =  event.target.responseText;
            _("progressBar").value = 0; //wil clear progress bar after successful upload
            
            var s = $('#form_add').serializeFormJSON();
            s.table='documents';
            //s.nom_document=nom_fichier;
            s.nom_document= _("status").innerHTML =  event.target.responseText;
            $.ajax({
                url:'api/ajouter.php',
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
    
    
          }
          
          function errorHandler(event) {
            _("status").innerHTML = "Upload Failed";
          }
          
          function abortHandler(event) {
            _("status").innerHTML = "Upload Aborted";
          }
    
    
    $.ajax({
            url:'api/ajouter.php',
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



//Modifier une valeur
$('#table_activites tbody').on('click', '.modifier', function (e) {
    e.preventDefault();
    $("#import_file").hide();
   
  
    $('.title_activity').text('Modifier une valeur');
   
    $('#edit_').show();
    $('#add_').hide();
	
	/*
	 var mesTypes=get_types();
    $('#type_doc').empty();
    $('#type_doc').append(mesTypes);
	
	*/


    $('#libelle_valeur_modif').on('change', function (e) {
        e.preventDefault();
        if ($('#libelle_valeur_modif').val() === 'autre') {
            $('#autre_libelle_modif').show();
        } else {
            $('#autre_libelle_modif').hide();
        }
    });

    var data = table.row($(this).parents('tr')).data();
    $('#type_doc').val(data.type_doc);
    $('#description').val(data.description);
    $('#gid').val(data.gid);

    $('#new_s').modal('show');
});  


$('#edit_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#form_add').serializeFormJSON();

    var s = $('#form_add').serializeFormJSON();
    s.table='documents';
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



// supprimer une valeur
$('#table_activites tbody').on('click', '.supprimer', function (e) {
    e.preventDefault();
    var data = table.row($(this).parents('tr')).data();
    $('.title2').html('<span style="color:blue">Suppression du document</span> '+data.description);
    $('.confirm_action').html("supprimer le document:<span style='color:red'>"+data.nom_document);
    $('#gid_sup').val(data.gid);
    $('#confirm_modal').modal('show');
});      



$('#delete_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#sup_element').serializeFormJSON();

    var s = $('#sup_element').serializeFormJSON();
    s.table='documents';
   
    
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



// Zone d'intervention
$('#table_activites tbody').on('click', '.intervention', function (e) {
    e.preventDefault();
    var data = table.row($(this).parents('tr')).data();
    
    $('.title3').html('<span style="color:blue">Zone d\'intervention du projet</span> '+data.nom_du_projet);
    $('#zone_inter_modal').data('id_projet', data.gid);
    $('#zone_inter_modal').modal('show');
    var mesUnites=get_entites("regions","regions");
    $('#regions').empty();
    $('#regions').append(mesUnites);

    var mesUnites=get_entites("departements","departements");
    $('#departements').empty();
    $('#departements').append(mesUnites);

    var mesUnites=get_entites("communes","communes");
    $('#communes').empty();
    $('#communes').append(mesUnites);

    zone_de_projets(data.gid,"*");
    
});  

$('#zone_inter_modal').on('show.bs.modal', function(){
    setTimeout(function() {
      map.invalidateSize();
    }, 5);
   });



        });


        function charger_map(){

        var mapCenter = [22, 87];
        var map = L.map('map', {center : mapCenter, zoom : 3});
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'examples.map-i875mjb7',
            noWrap : true
        }).addTo(map);
        
        
        var marker = L.marker(mapCenter).addTo(map);
        var updateMarker = function(lat, lng) {
            marker
                .setLatLng([lat, lng])
                .bindPopup("Your location :  " + marker.getLatLng().toString())
                .openPopup();
            return false;
        };
        
        map.on('click', function(e) {
            $('#latInput').val(e.latlng.lat);
            $('#lngInput').val(e.latlng.lng);
            updateMarker(e.latlng.lat, e.latlng.lng);
        });
        
        var updateMarkerByInputs = function() {
            return updateMarker( $('#latInput').val() , $('#lngInput').val());
        }
        $('#latInput').on('input', updateMarkerByInputs);
        $('#lngInput').on('input', updateMarkerByInputs);

    }


    var nom_fichier;
    function _(el) {
      return document.getElementById(el);
    }

    