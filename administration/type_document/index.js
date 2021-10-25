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
        "url": 'api/get_type_doc.php'
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
        {"data": "type_doc"},
        {"data": "description"}

    ],
    
  } );

  //table.ajax.reload();


//Fonction qui déclenche le popup d'ajout de nouvelles valeurs

$('#new_s_').on('click', function (e) {
   
    $('.title_activity').text('Ajout de nouvelles données');
    $('#edit_').hide();
    $('#add_').show(); 
    $('#new_s').modal('show');   
});

$('#add_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#form_add').serializeFormJSON();

    var s = $('#form_add').serializeFormJSON();
    s.table='type_document';
    //s.utilisateur=id_user;
    console.log(s);
    
    
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
   
    $('.title_activity').text('Modifier une valeur');
   
    $('#edit_').show();
    $('#add_').hide();


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
    s.table='type_document';
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
    $('.title2').html('<span style="color:blue">Suppression du type document</span> '+data.type_doc);
    $('.confirm_action').html("supprimer le type:<span style='color:red'>"+data.type_doc);
    $('#gid_sup').val(data.gid);
    $('#confirm_modal').modal('show');
});      



$('#delete_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#sup_element').serializeFormJSON();

    var s = $('#sup_element').serializeFormJSON();
    s.table='type_document';
   
    
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
