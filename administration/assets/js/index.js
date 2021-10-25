var get_entites = function (entite,id_parent) {
	$("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
        var liste_ent="<option value=''>"+entite+"</option>";
        var parent;
      if(entite==="departements") entite_parent="regions"
      else entite_parent="departements";
      
      id_parent=$("#entite_"+entite_parent).val();
        var obj={
          uniteAdmin:entite,
          parent:id_parent
              }
              obj=JSON.stringify(obj);
            $.ajax({
              url: 'api/get_entites.php?entite='+entite,
              type: 'GET',
              'async': false,
              'global': false,
              contentType : 'application/json; charset=UTF-8',
              data: obj,
                'success': function (result) {
      
                for(var k=0;k<result.length;k++)
                {
              if(parent===result[k].nom_parent && entite!="regions") {
                liste_ent +="<option value='"+result[k].gid+"'>"+result[k].nom+"</option>";
              }
      else if (entite==="regions") {
        liste_ent +="<option value='"+result[k].gid+"'>"+result[k].nom+"</option>";
      }
              else {
                liste_ent +=" <optgroup label='"+result[k].nom_parent+"'><option value='"+result[k].gid+"'>"+result[k].nom+"</option>";
              }
      
              parent=result[k].nom_parent;
                }
      
                }
            });
      $("._loader").html('');
            return liste_ent;
        }


        var get_entites2 = function (entite,id_parent) {
			$("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
          var liste_ent="<option value=''>"+entite+"</option>";
          var parent;
        if(entite==="departements") entite_parent="regions"
        else entite_parent="departements";
        
        
          var obj={
            uniteAdmin:entite,
            parent:id_parent
                }
                obj=JSON.stringify(obj);
              $.ajax({
                url: 'api/get_entites2.php?entite='+entite+'&id_parent='+id_parent,
                type: 'GET',
                'async': false,
                'global': false,
                contentType : 'application/json; charset=UTF-8',
               // data: obj,
                  'success': function (result) {
        
                  for(var k=0;k<result.length;k++)
                  {
                if(parent===result[k].nom_parent && entite!="regions") {
                  liste_ent +="<option value='"+result[k].gid+"'>"+result[k].nom+"</option>";
                }
        else if (entite==="regions") {
          liste_ent +="<option value='"+result[k].gid+"'>"+result[k].nom+"</option>";
        }
                else {
                  liste_ent +=" <optgroup label='"+result[k].nom_parent+"'><option value='"+result[k].gid+"'>"+result[k].nom+"</option>";
                }
        
                parent=result[k].nom_parent;
                  }
        
                  }
              });
        $("._loader").html('');
              return liste_ent;
          }


          var get_geom_entites = function (entite,id) {
            var liste_ent;
          
          $("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
                $.ajax({
                  url: 'api/get_geom_entites.php?entite='+entite+'&gid='+id,
                  type: 'GET',
                  'async': false,
                  'global': false,
                  contentType : 'application/json; charset=UTF-8',
                 // data: obj,
                    'success': function (result) {
                      liste_ent=result;
                   
                    }
                });
          $("._loader").html('');
                return liste_ent;
            }


        var get_especes = function () {
			$("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
          var liste_ent="<option value=''>Sélectionner</option>";
              $.ajax({
                url: 'api/get_especes.php',
                type: 'GET',
                'async': false,
                'global': false,
                contentType : 'application/json; charset=UTF-8',
               // data: obj,
                  'success': function (result) {
        
                  for(var k=0;k<result.length;k++)
                  {
                    liste_ent +="<option value='"+result[k].gid+"'>"+result[k].nom_espece+"</option>";
                  }
        
                  }
              });
        $("._loader").html('');
              return liste_ent;
          }


          var get_localites = function () {
			  $("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
            var liste_ent="<option value=''>Sélectionner</option>";
                $.ajax({
                  url: 'api/get_localites.php',
                  type: 'GET',
                  'async': false,
                  'global': false,
                  contentType : 'application/json; charset=UTF-8',
                 // data: obj,
                    'success': function (result) {
          
                    for(var k=0;k<result.length;k++)
                    {
                      liste_ent +="<option value='"+result[k].gid+"'>"+result[k].localite+"</option>";
                    }
          
                    }
                });
          $("._loader").html('');
                return liste_ent;
            }

            var get_maladies = function () {
				$("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
              var liste_ent="<option value=''>Sélectionner</option>";
                  $.ajax({
                    url: 'api/get_list_maladies.php',
                    type: 'GET',
                    'async': false,
                    'global': false,
                    contentType : 'application/json; charset=UTF-8',
                   // data: obj,
                      'success': function (result) {
            
                      for(var k=0;k<result.length;k++)
                      {
                        liste_ent +="<option value='"+result[k].gid+"'>"+result[k].maladie+"</option>";
                      }
            
                      }
                  });
            $("._loader").html('');
                  return liste_ent;
              }

			  
			   var get_marches = function () {
				  
				   $("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
              var liste_ent="<option value=''>Sélectionner</option>";
                  $.ajax({
                    url: 'api/get_list_marches.php',
                    type: 'GET',
                    'async': false,
                    'global': false,
                    contentType : 'application/json; charset=UTF-8',
                   // data: obj,
                      'success': function (result) {
            
                      for(var k=0;k<result.length;k++)
                      {
                        liste_ent +="<option value='"+result[k].gid+"'>"+result[k].marches+"</option>";
                      }
            
                      }
                  });
            $("._loader").html('');
                  return liste_ent;
              }


              


            var get_liste_infras = function (up,type) {
				$("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
              var liste_ent;
                  $.ajax({
                    url: 'api/get_infrastructures.php?up='+up+'&type='+type,
                    type: 'GET',
                    'async': false,
                    'global': false,
                    contentType : 'application/json; charset=UTF-8',
                      'success': function (result) {
                      liste_ent=result;           
                      }
                  });
            $("._loader").html('');
                  return liste_ent;
              }



              var get_types = function () {
				  $("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
                var liste_ent="<option value=''>Sélectionner</option>";
                    $.ajax({
                      url: 'api/get_type_docs.php',
                      type: 'GET',
                      'async': false,
                      'global': false,
                      contentType : 'application/json; charset=UTF-8',
                     // data: obj,
                        'success': function (result) {
              
                        for(var k=0;k<result.length;k++)
                        {
                          liste_ent +="<option value='"+result[k].gid+"'>"+result[k].type_doc+"</option>";
                        }
              
                        }
                    });
              $("._loader").html('');
                    return liste_ent;
                }
      
	  
	    var get_types_don = function () {
			$("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
                var liste_ent="<option value=''>Sélectionner</option>";
                    $.ajax({
                      url: 'api/get_type_dons.php',
                      type: 'GET',
                      'async': false,
                      'global': false,
                      contentType : 'application/json; charset=UTF-8',
                     // data: obj,
                        'success': function (result) {
              
                        for(var k=0;k<result.length;k++)
                        {
                          liste_ent +="<option value='"+result[k].gid+"'>"+result[k].type_doc+"</option>";
                        }
              
                        }
                    });
              $("._loader").html('');
                    return liste_ent;
                }
				
				 var get_bases = function () {
					 $("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
                var liste_ent="<option value=''>Sélectionner</option>";
                    $.ajax({
                      url: 'api/get_bases.php',
                      type: 'GET',
                      'async': false,
                      'global': false,
                      contentType : 'application/json; charset=UTF-8',
                     // data: obj,
                        'success': function (result) {
              
                        for(var k=0;k<result.length;k++)
                        {
                          liste_ent +="<option value='"+result[k].nom+"'>"+result[k].nom+"</option>";
                        }
              
                        }
                    });
              $("._loader").html('');
                    return liste_ent;
                }
      
    
 var get_value_legende = function (nom_table,nom_champ) {
					 $("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
                     var liste_ent="<option value=''>Sélectionner</option>";
                    $.ajax({
                      url: 'api/get_value_legende.php?nom_table='+nom_table+'&nom_champ='+nom_champ,
                      type: 'GET',
                      'async': false,
                      'global': false,
                      contentType : 'application/json; charset=UTF-8',
                     // data: obj,
                        'success': function (result) {
              var resultat=JSON.parse(result);
                        for(var k=0;k<resultat.length;k++)
                        {
                          liste_ent +="<option value='"+resultat[k].id+"'>"+resultat[k].id+"</option>";
                        }
              
                        }
                    });
              $("._loader").html('');
                    return liste_ent;
                }
      
    




var get_dictionnaire = function (nom_table) {
	$("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
        var list_elems;     
            $.ajax({
              url: 'api/get_dictionnaire.php?nom_table='+nom_table,
              type: 'GET',
              'async': false,
              'global': false,
           "content-type": "application/json",
              //data: obj,
                'success': function (result) {
				list_elems=result;
                }
            });
          $("._loader").html('');
            return list_elems;
        }
		
		
		var get_champs_formate = function (nom_colone) {
	  var list_elems;     
            $.ajax({
              url: 'api/get_champs_formate.php?nom_colone='+nom_colone,
              type: 'GET',
              'async': false,
              'global': false,
           "content-type": "application/json",
              //data: obj,
                'success': function (result) {
				list_elems=result;
                }
            });
            return list_elems;
        }
		
		
		
		var get_all_thematique = function () {
					 $("._loader").html('<img src="../images/ajax-loader.gif" style="max-width:16px;max-height:16px" >');
                     var liste_ent="<option value=''>Sélectionner</option>";
                    $.ajax({
                      url: 'api/get_all_thematique.php',
                      type: 'GET',
                      'async': false,
                      'global': false,
                      contentType : 'application/json; charset=UTF-8',
                     // data: obj,
                        'success': function (result) {
                        var resultat=JSON.parse(result);
                        for(var k=0;k<resultat.length;k++)
                        {
                          liste_ent +="<option value='"+resultat[k].id+"'>"+resultat[k].thematique+"</option>";
                        }
              
                        }
                    });
              $("._loader").html('');
                    return liste_ent;
                }
