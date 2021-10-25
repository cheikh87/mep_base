function taches(){
//Fonction qui déclenche le popup d'ajout de nouvelles valeurs


    $.ajax({
            url:'api/get_stats.php',
            type: 'GET',
            "content-type": "application/json",
            "cache-control": "no-cache",
          //  data: s,
            success: function (result) {
                    
                    
                  for(var k=0;k<result.length;k++)
                      {
                       $("#vue_"+k).html(result[k].nombre);
                      }

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });

          
}

taches();

