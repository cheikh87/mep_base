var urlAPI = config.url;
$(document).ready(function () {
    var urlUtilisateurs = '/utilisateurs';
    function notification(msg_type, msg, icon) {
        Lobibox.notify(msg_type, {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: icon,
            msg: msg
        });
    }
    $('#email').keypress(function (e) {
        if (e.which == 13) {
            reset();
        }
    });
    $('#reset_password').on('click', function (e) {
        reset();
    });
    function reset() {
        var email = $('#email').val();
        $.ajax({
            url: urlAPI+urlUtilisateurs+ '/resetPassword',
            type: 'POST',
            data: {
                email: email
            },
            success: function (result) {
                notification('success', result.message, 'fa fa-check-circle');
            },
            error: function (data) {
                notification('error', data.responseJSON.message, 'fa fa-times-circle');
            }
        });
    }
});