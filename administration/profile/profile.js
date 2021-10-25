$(document).ready(function() {
    // gestion des tableaux
    var messages_envoyes = $('#messages_envoyes').DataTable({
        searching: false,
        language: {
            "url": "assets/i18n/datatable.json"
        },
        lengthMenu: [[5,10,15,-1],[5,10,15,"All"]],
        pageLength: 5
    });
    var historique = $('#historique').DataTable({
        searching: false,
        language: {
            "url": "assets/i18n/datatable.json"
        },
        lengthMenu: [[5,10,15,-1],[5,10,15,"All"]],
        pageLength: 5,
        ajax: {
            "url": urlAPI + '/utilisateurs/' +utilisateur.data.username+ '/historique',
            "dataSrc":""
        },
        columns: [
            {
                "data": null,
                "render": function (data) {
                    return 'S\'est connecté le';
                }
            },
            {
                "data": "date",
                "render": function (data) {
                    var d = new Date(data);
                    let options = {  
                        weekday: 'long',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: 'numeric'
                    };
                    return d.toLocaleString('fr-SN', options);
                }
            }
        ]
    });

    // affichage des informations de l'utilisateur
    $.ajax({
        url: urlAPI+ '/utilisateurs/' + utilisateur.data.id,
        type: 'GET',
        success: function (result1) {
            console.log(result1);
            $('#prenoms_nom_utilisateur').text(result1.prenoms+ ' ' +result1.nom);
            $('#email_utilisateur').text(result1.email);
            $('#nom').val(result1.nom);
            $('#prenoms').val(result1.prenoms);
            $('#email').val(result1.email);
            $('#username').val(result1.username);
            $.ajax({
                url: urlAPI+ '/structures/' + result1.structure,
                type: 'GET',
                success: function (result2) {
                    console.log(result2);
                    $('#structure_utilisateur').text(result2.nom);
                    $('#siteweb_utilisateur').html('<a href="'+result2.siteweb+'" target="_blank">'+result2.siteweb+'</a>');
                    $('#structure').val(result2.nom);
                    $('#siteweb').val(result2.siteweb);
                },
                error: function (data) {
                    notification('warning', data.responseJSON.message, 'fa fa-exclamation-circle');
                }
            });
        },
        error: function (data) {
            notification('warning', data.responseJSON.message, 'fa fa-exclamation-circle');
        }
    });

    // modifier utilisateur
    $('#edit_utilisateur').on('click', function (e) {
        e.preventDefault();
        var id = utilisateur.data.id;
        var nom = $("#nom").val();
        var prenoms = $("#prenoms").val();
        var email = $("#email").val();
        var username = utilisateur.data.username;
        var structure = utilisateur.data.structure;
        var role = utilisateur.data.role;
        $.ajax({
            url: urlAPI+ '/utilisateurs/' +id,
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
                notification('success', result.message, 'fa fa-check-circle');
            },
            error: function (data) {
                notification('error', data.responseJSON.message, 'fa fa-times-circle');
            }
        });
    });

    // modifier le mot de passe
    $('#edit_password').on('click', function (e) {
        e.preventDefault();
        var id = utilisateur.data.id;
        var password = $('#password').val();
        var new_password = $('#new_password').val();
        var confirmed_password = $('#confirmed_password').val();
        $.ajax({
            url: urlAPI+ '/utilisateurs/' +id+ '/updatePassword',
            type: 'PUT',
            data: {
                password: password,
                new_password: new_password,
                confirmed_password: confirmed_password
            },
            success: function (result) {
                notification('success', result.message, 'fa fa-check-circle');
            },
            error: function (data) {
                notification('error', data.responseJSON.message, 'fa fa-times-circle');
            }
        });
    });
});
