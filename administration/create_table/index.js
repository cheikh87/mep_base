$(document).ready(function() {
	
	var mesThem=get_all_thematique();
    $('#thematique').empty();
    $('#thematique').append(mesThem);

var MaxInputs       = 100; //maximum extra input boxes allowed
var InputsWrapper   = $("#InputsWrapper"); //Input boxes wrapper ID
var AddButton       = $("#AddMoreFileBox"); //Add button ID

var x = InputsWrapper.length; //initlal text box count
var FieldCount=1; //to keep track of text box added

//on add input button click
$(AddButton).click(function (e) {
        //max input box allowed
        if(x <= MaxInputs) {
            FieldCount++; //text box added ncrement
            //add input box
            $(InputsWrapper).append('<div><input class="form-control" placeholder="Nom du champ" style="border:1px solid gray;padding:5px" type="text" name="mytext[]" id="field_'+ FieldCount +'"/> <select style="border:2px solid red;padding:3px" name="myselect_s[]" id="sel_'+ FieldCount +'"><option value="text">Selectionner le type d\'informations</option><option value="double precision">Monnaie</option><option value="Integer">Nombre</option><option value="date">Date</option><option value="text">Autre</option></select> <a href="#" class="removeclass">Supprimer</a></div>');
            x++; //text box increment
            
            $("#AddMoreFileId").show();
            
            $('AddMoreFileBox').html("Add field");
            
            // Delete the "add"-link if there is 3 fields.
            if(x == 100) {
                $("#AddMoreFileId").hide();
             	$("#lineBreak").html("<br>");
            }
        }
        return false;
});

$("body").on("click",".removeclass", function(e){ //user click on remove text
        if( x > 1 ) {
                $(this).parent('div').remove(); //remove text box
                x--; //decrement textbox
            
            	$("#AddMoreFileId").show();
            
            	$("#lineBreak").html("");
            
                // Adds the "add" link again when a field is removed.
                $('AddMoreFileBox').html("Add field");
        }
	return false;
}) 


 $('#submit_create_table').on('click', function (e) {
    e.preventDefault();

var s = $('#Form_table').serializeFormJSON();

	 $.ajax({
            url:'api/ajouter_table.php',
            type: 'POST',
            "content-type": "application/json",
            "cache-control": "no-cache",
            data: s,
            success: function (result) {
                    
                    
                    notification('success',result.message, 'fa fa-check-circle');
         
                    $("#Form_table")[0].reset();
					get_elments_menu();
                  

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });

});

});