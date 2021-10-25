var str = '';
jQuery.each(data, function (key, value) {
    str += '<tr><td>' + value[0] + '</td>'
        + '<td>' + value[1] + '</td>'
        + '<td>' + value[2] + '</td>'
        + '<td>' + value[3] + '</td></tr>';
});
jQuery('table[name=drg_table] tbody').html(str);