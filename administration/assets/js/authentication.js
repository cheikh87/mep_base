var urlAPI = config.url;
$(document).ready(function () {
    var urlUtilisateurs = '/utilisateurs';
	// notification
	function notification(msg_type, msg, icon) {
        Lobibox.notify(msg_type, {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: icon,
            msg: msg
        });
    }

    // bouton de connexion
	$('#connection').on( 'click', function () {
        connection();
    });
    $('#username').keypress(function (e) {
        if (e.which == 13) {
            connection();
        }
    });
    $('#password').keypress(function (e) {
        if (e.which == 13) {
            connection();
        }
    });

    // function d'autentification
    function connection() {
        var username = $('#username').val();
        var password = $('#password').val();
        $.ajax({
            url: urlAPI+urlUtilisateurs+ '/authenticate',
            type: 'POST',
            dataType: 'JSON',
            data: {
                username: username,
                password: password
            },
            success: function (result) {
                var token = result.token;
                if (token) {
                    Cookies.set('token', token);
                    document.location.href = "./";
                }
            },
            error: function(data){
                $('#auth_failed').text(data.responseJSON.message);
            }
        });
    }
});
