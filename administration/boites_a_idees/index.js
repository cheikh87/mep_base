var table = $('#table_activites').DataTable( {
    lengthChange: false,
     responsive: true,
     language: {
                "url": "assets/i18n/datatable.json"
        },
dom: 'Bfrtip',
   buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ],
   
   ajax: {
        "url": 'api/get_boites.php'
    },
    buttons: [ 'excel', 'pdf', 'colvis' ],
    columns: [
        {
            "data": "",
            "render": function (data) {
                var bouton_modifier = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="modifier" class="btn-warning modifier"><i class="fa fa-edit"></i></button>';
                var bouton_supprimer = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="supprimer" class="btn-danger supprimer"><i class="fa fa-trash"></i></button>';
                var bouton_zone_interv = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="Zone d\'intervention" class="btn-success intervention"><i class="fa fa-map"></i></button>'; 
                    return '<div style="font-size:10px;" align="center">'+
                       bouton_supprimer
                    +'</div>';
               
            }
        },
        {"data": "message"},
        {"data": "nom"},
		{"data": "email"},
        {
            "data": "lu",
            "render": function (data) {
                if (data) {
                    return '<div align="center"> <i title="Message lu" class="fa fa-check" style="color: green;"></i> </div>' ;
                }
                return '<div align="center"> <i title="Message non lu" class="fa fa-close" style="color: red;"></i> </div>';
            }
        }

    ],
    
  } );

  //table.ajax.reload();

$(document).ready(function() {
//Fonction qui déclenche le popup d'ajout de nouvelles valeurs

$('#new_s_').on('click', function (e) {
    $('.title_activity').text('Ajout de nouvelles données');
    $('#edit_').hide();
    $('#add_').show(); 
    //$('#new_s').modal('show');  
    $('#new_s_import').modal('show');
    resizeMymap();   
});

$('#add_i').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

    var s_json=$('#form_add_i').serializeFormJSON();

    var s = $('#form_add_i').serializeFormJSON();
   if(s.etat==="on")
   s.etat===true
   else
   s.etat=false;
   
    s.table='forage';
    //s.utilisateur=id_user;
    //console.log(s);

    var pt = turf.point([$('#lon').val(),$('#lat').val()]);
    var crs ={"type":"name","properties":{"name":"EPSG:4326"}};
    pt.geometry.crs=crs;
    pt.geometry.type='Multipoint';
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
                   
                    $("#form_add_i")[0].reset();
                    $('#zone_inter_modal').modal('hide');
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
    
    $('.title_activity').text('Modifier un forage');
   
    $('#edit_').show();
    $('#add_i').hide();
    var mesCommunes=get_entites("communes");
    $('#commune').empty();
    $('#commune').append(mesCommunes);
   $('.non_modifiable').hide();
    


    $('#libelle_valeur_modif').on('change', function (e) {
        e.preventDefault();
        if ($('#libelle_valeur_modif').val() === 'autre') {
            $('#autre_libelle_modif').show();
        } else {
            $('#autre_libelle_modif').hide();
        }
    });

    var data = table.row($(this).parents('tr')).data();
    $('#nom_forage').val(data.nom_forage);
    $('#commune').val(data.commune);
    if(data.etat===true)
    $("#etat").attr("checked", "checked");
    else
    $("#etat").removeAttr("checked"); 
    
    $('#gid').val(data.gid);

    $('#zone_inter_modal').modal('show');

    setTimeout(function(){
        map.invalidateSize();
        $('#lon').val(data.lon);
        $('#lat').val(data.lat);
        
        }
         , 1000);
   
});  


$('#edit_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#form_add').serializeFormJSON();

var s = $('#form_add_i').serializeFormJSON();
if(s.etat==="on")
s.etat===true
else
s.etat=false;

 s.table='forage';
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
         
                    $("#form_add_i")[0].reset();
                    $('#zone_inter_modal').modal('hide');
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
    $('.title2').html('<span style="color:blue">Suppression du message de : </span> '+data.nom);
    $('.confirm_action').html("supprimer le message de <span style='color:red'>"+data.nom);
    $('#gid_sup').val(data.gid);
    $('#confirm_modal').modal('show');
});      



$('#delete_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#sup_element').serializeFormJSON();

    var s = $('#sup_element').serializeFormJSON();
    s.table='boites_a_idees';
   
    
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
$('.intervention').on('click', function (e) {
   
    $('.title3').html('<span style="color:blue">Ajouter un nouveau forage</span> ');
    $('#edit_').hide();
    $('#add_i').show();
    //$('.non_modifiable').show();
    var mesCommunes=get_entites("communes");
    $('#commune').empty();
    $('#commune').append(mesCommunes);
    $('#zone_inter_modal').modal('show');
    //$("#etat").attr(checked, "checked");
    $("#etat").removeAttr("checked"); 
    

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
                           table.ajax.reload();
            
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
    
    ajax.open("POST", "api/upload.php"); // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
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
    _("status_").innerHTML = event.target.responseText;
    _("progressBar_").value = 0; //wil clear progress bar after successful upload
      charger_shape_(nom_fichier);
      $("#description_du_doc_").html('');
  }
  
  function errorHandler_(event) {
    _("status_").innerHTML = "Upload Failed";
  }
  
  function abortHandler_(event) {
    _("status_").innerHTML = "Upload Aborted";
  }
  


function charger_shape(shape)
{

      var base = 'api/zip/'+shape;
		shp(base).then(function(data){
		
		
		geo.addData(data);
		var src={"type":"name","properties":{"name":"EPSG:4326"}};
		
		var obj =  {
            "shape": data
          }
   
  

        obj = JSON.stringify(obj)
        
        $.ajax({
          url:'api/insertion_forage.php',
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
var mapCenter = [14, -14];
var marker = L.marker(mapCenter).addTo(map);
        var updateMarker = function(lat, lng) {
            marker
                .setLatLng([lat, lng])
                .bindPopup("Localisation :  " + marker.getLatLng().toString())
                .openPopup();
            return false;
        };
	  
map.on('click', function(e) {
    $('#lat').val(e.latlng.lat);
    $('#lon').val(e.latlng.lng);
    updateMarker(e.latlng.lat, e.latlng.lng);
});

var updateMarkerByInputs = function() {
    return updateMarker( $('#lat').val() , $('#lon').val());
}
$('#lat').on('input', updateMarkerByInputs);
$('#lon').on('input', updateMarkerByInputs);
