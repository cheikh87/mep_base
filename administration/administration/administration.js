var urlUtilisateurs = '/utilisateurs';
var urlSectoriels = '/structures';
$(document).ready(function() {
    var structures_id = new Array();
    var structures_nom = new Array();
    // récupération des noms des structures
    $.ajax({
        url: urlAPI+urlSectoriels+ '/',
        type: 'GET',
        success: function (result) {
            $.each(result, function (i, value) {
                structures_id[i] = value.id;
                structures_nom[i] = value.nom;
            });
        },
        error: function (data) {
            notification('warning', data.responseJSON.message, 'fa fa-exclamation-circle');
        }
    });
    // gestion du tableau
    var table = $('#example').DataTable( {
        language: {
            "url": "assets/i18n/datatable.json"
        },
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'copy',
                text: '<i data-toggle="tooltip" data-placement="left" title="tout copier" class="fa fa-copy"></i>'
            },
            {
                extend: 'excel',
                text: '<i data-toggle="tooltip" data-placement="left" title="exporter au format excel" class="fa fa-file-excel-o"></i>'
            },
            {
                extend: 'pdf',
                text: '<i data-toggle="tooltip" data-placement="left" title="exporter au format pdf" class="fa fa-file-pdf-o"></i>'
            },
            {
                extend: 'print',
                text: '<i data-toggle="tooltip" data-placement="left" title="imprimer" class="fa fa-print"></i>'
            },
            {
                extend: 'colvis',
                text: '<i data-toggle="tooltip" data-placement="left" title="cacher la colonne" class="fa fa-eye-slash"></i>'
            }
        ],
        ajax: {
            "url": urlAPI + urlUtilisateurs + '/',
            "dataSrc":""
        },
        columns: [
            {"data": "nom"},
            {"data": "prenoms"},
            {"data": "username"},
            {"data": "email"},
            {
                "data": "structure",
                "render": function (data) {
                    for (var i = 0; i < structures_nom.length; i++) {
                        if (data === structures_id[i]) {
                            return structures_nom[i];
                        }
                    }
                }
            },
            {
                "data": "role",
                "render": function (data) {
                    if (data === 3) {
                        return 'Administrateur';
                    } else if (data === 2) {
                        return 'Parfa - UCP';
                    }
                    return 'Sectoriel';
                }
            },
            {
                "data": "active",
                "render": function (data) {
                    if (data) {
                        return '<div align="center"> <i class="fa fa-check" style="color: green;"></i> <div>' ;
                    }
                    return '<div align="center"> <i class="fa fa-close" style="color: red;"></i> <div>';
                }
            },
            {
                "data": "id",
                "render": function (data) {
                    var bouton_activer = '<button data-toggle="tooltip" data-placement="left" title="activer/désactiver" class="btn-info activer"><i class="fa fa-lock"></i></button>';
                    var bouton_modifier = '<button data-toggle="tooltip" data-placement="left" title="modifier" class="btn-warning modifier"><i class="fa fa-edit"></i></button>';
                    var bouton_supprimer = '<button data-toggle="tooltip" data-placement="left" title="supprimer" class="btn-danger supprimer"><i class="fa fa-trash"></i></button>';
                    var bouton_regenerer = '<button data-toggle="tooltip" data-placement="left" title="régénérer mot de passe" class="btn-default regenerer"><i class="fa fa-key"></i></button>';
                    if (utilisateur.data.id === data) {
                        return '<div style="font-size:10px;" align="center">'+bouton_modifier+'</div>';
                    }
                    return '<div style="font-size:10px;" align="center">'+
                    bouton_activer+'&nbsp;'+bouton_modifier+'&nbsp;'+bouton_supprimer+'&nbsp;'+bouton_regenerer
                    +'</div>';
                }
            }
        ]
    });
    table.buttons().container().appendTo( '#example_wrapper .col-md-6:eq(0)' );
    
    // ajouter une resource
    $('.ajouter').on('click', function (e) {
        e.preventDefault();
        $('#title').text('Ajouter un utilisateur');
        $('#form .form-control').val('');
        $('#edit').hide();
        $('#add').show();
        $("#email").prop("disabled", false);
        $("#username").prop("disabled", false);

        // afficher les structures
        $.ajax({
            url: urlAPI+urlSectoriels+ '/',
            type: 'GET',
            success: function (result) {
                $('#structure').children('option').remove();
                $('#structure').append('<option value="">--- Sélectionner la structure ---</option>');
                $.each(result, function (i, value) {
                    $('#structure').append('<option value="' +value.id+ '">' +value.nom+ '</option>');
                });
            },
            error: function (data) {
                notification('warning', data.responseJSON.message, 'fa fa-exclamation-circle');
            }
        });
        
        $('#form_modal').modal('show');
    });
    $('#add').on('click', function (e) {
        e.preventDefault();
        var nom = $("#nom").val();
        var prenoms = $("#prenoms").val();
        var email = $("#email").val();
        var username = $("#username").val();
        var structure = $("#structure").val();
        var role = $("#role").val();
        $.ajax({
            url: urlAPI+urlUtilisateurs+'/',
            type: 'POST',
            data: {
                nom: nom,
                prenoms: prenoms,
                email: email,
                username: username,
                structure: structure,
                role: role
            },
            success: function (result) {
                $('#form_modal').modal('hide');
                table.ajax.reload();
                notification('success', result.message, 'fa fa-check-circle');
            },
            error: function (data) {
                notification('error', data.responseJSON.message, 'fa fa-times-circle');
            }
        });
    });

    // modifier une resource
    $('#example tbody').on('click', '.modifier', function (e) {
        e.preventDefault();
        $('#title').text('Modifier un utilisateur');
        $('#add').hide();
        $('#edit').show();
        $("#email").prop("disabled", true);
        $("#username").prop("disabled", true);

        var data = table.row($(this).parents('tr')).data();
        $('#form_modal').data('data_id', data.id);

        // afficher les structures
        $.ajax({
            url: urlAPI+urlSectoriels+ '/',
            type: 'GET',
            success: function (result) {
                $('#structure').children('option').remove();
                $.each(result, function (i, value) {
                    if (data.structure === value.id) {
                        $('#structure').append('<option value="' +value.id+ '" selected>' +value.nom+ '</option>');
                    } else {
                        $('#structure').append('<option value="' +value.id+ '">' +value.nom+ '</option>');
                    }
                });
            },
            error: function (data) {
                notification('warning', data.responseJSON.message, 'fa fa-exclamation-circle');
            }
        });

        $('#nom').val(data.nom);
        $('#prenoms').val(data.prenoms);
        $('#email').val(data.email);
        $('#username').val(data.username);
        $('#role').val(data.role);
        
        $('#form_modal').modal('show');
    });
    $('#edit').on('click', function (e) {
        e.preventDefault();
        var id = $('#form_modal').data('data_id');
        var nom = $("#nom").val();
        var prenoms = $("#prenoms").val();
        var email = $("#email").val();
        var username = $("#username").val();
        var structure = $("#structure").val();
        var role = $("#role").val();
        $.ajax({
            url: urlAPI+urlUtilisateurs+ '/' +id,
            type: 'PUT',
            data: {
                nom: nom,
                prenoms: prenoms,
                email: email,
                username: username,
                structure: structure,
                role: role
            },
            success: function (result) {
                $('#form_modal').modal('hide');
                table.ajax.reload();
                notification('success', result.message, 'fa fa-check-circle');
            },
            error: function (data) {
                notification('error', data.responseJSON.message, 'fa fa-times-circle');
            }
        });
    });

    // supprimer une resource
    $('#example tbody').on('click', '.supprimer', function (e) {
        e.preventDefault();
        var data = table.row($(this).parents('tr')).data();
        $('#confirm_modal').data('data_id', data.id);
        $('#title2').text('Supprimer un utilisateur');
        $('#confirm_action').text(' supprimer ' +data.prenoms+ ' ' +data.nom);
        $('#activate').hide();
        $('#regenerate').hide();
        $('#delete').show();
        $('#confirm_modal').modal('show');
    });
    $('#delete').on('click', function (e) {
        e.preventDefault();
        var id = $('#confirm_modal').data('data_id');
        $.ajax({
            url: urlAPI+urlUtilisateurs+ '/' +id,
            type: 'DELETE',
            success: function (result) {
                $('#confirm_modal').modal('hide');
                table.ajax.reload();
                notification('success', result.message, 'fa fa-check-circle');
            },
            error: function (data) {
                notification('error', data.responseJSON.message, 'fa fa-times-circle');
            }
        });
    });

    // régénérer le mot de passe d'une resource
    $('#example tbody').on('click', '.regenerer', function (e) {
        e.preventDefault();
        var data = table.row($(this).parents('tr')).data();
        $('#confirm_modal').data('data_email', data.email);
        $('#title2').text('Régénérer un mot de mot utilisateur');
        $('#confirm_action').text(' régénérer le mode passe de ' +data.prenoms+ ' ' +data.nom);
        $('#activate').hide();
        $('#delete').hide();
        $('#regenerate').show();
        $('#confirm_modal').modal('show');
    });
    $('#regenerate').on('click', function (e) {
        e.preventDefault();
        var email = $('#confirm_modal').data('data_email');
        $.ajax({
            url: urlAPI+urlUtilisateurs+ '/resetPassword',
            type: 'POST',
            data: {
                email: email
            },
            success: function (result) {
                $('#form_modal').modal('hide');
                table.ajax.reload();
                notification('success', result.message, 'fa fa-check-circle');
            },
            error: function (data) {
                notification('error', data.responseJSON.message, 'fa fa-times-circle');
            }
        });
    });

    // activer/désactiver une resource
    $('#example tbody').on('click', '.activer', function (e) {
        e.preventDefault();
        var data = table.row($(this).parents('tr')).data();
        $('#confirm_modal').data('data', data);
        $('#title2').text('Activer/Désactiver un utilisateur');
        if (data.active) {
            $('#confirm_action').text(' désactiver ' +data.prenoms+ ' ' +data.nom);
            $('#activer').text('Désactiver');
        } else {
            $('#confirm_action').text(' activer ' +data.prenoms+ ' ' +data.nom);
            $('#activer').text('Activer');
        }
        $('#delete').hide();
        $('#regenerate').hide();
        $('#activate').show();
        $('#confirm_modal').modal('show');
    });
    $('#activate').on('click', function (e) {
        e.preventDefault();
        var data = $('#confirm_modal').data('data');
        var activate = data.id;
        if (data.active) {
            activate += '/disable';
        } else {
            activate += '/enable';
        }
        $.ajax({
            url: urlAPI+urlUtilisateurs+ '/' +activate,
            type: 'PUT',
            success: function (result) {
                $('#confirm_modal').modal('hide');
                table.ajax.reload();
                notification('success', result.message, 'fa fa-check-circle');
            },
            error: function (data) {
                notification('error', data.responseJSON.message, 'fa fa-times-circle');
            }
        });
    });
});
