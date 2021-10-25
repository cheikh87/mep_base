var urlIndicateurs = '/indicateurs';
$(document).ready(function() {
    /* affichage du nombre d'indicateurs, d'indicateurs actifs et inactifs */
    $.ajax({
        url: urlAPI+urlIndicateurs+ '/',
        type: 'GET',
        success: function (result) {
            var count = 0, count_actif = 0, count_inactif = 0;
            $.each(result, function (i, value) {
                ++count;
                if (value.active) {
                    ++count_actif;
                } else {
                    ++count_inactif;
                }
            });
            $('#count-indicateurs').text(count);
            $('#count-indicateurs-actifs').text(count_actif);
            $('#count-indicateurs-inactifs').text(count_inactif);
        },
        error: function (data) {
            notification('warning', data.responseJSON.message, 'fa fa-exclamation-circle');
        }
    });
    $('#pointer').on('click', function (e) {
        e.preventDefault();
        var data = {
            "id": 15,
            "designation": "Composition floristique ‒ Diversité de la flore",
            "unite": "",
            "couverture": "",
            "source": "",
            "methode_collecte": "",
            "frequence_acquisition": "",
            "responsable_collecte": "",
            "methode_analyse": "",
            "presentation": "",
            "note_baseline": "",
            "commentaire": "",
            "id_sectoriel": 2,
            "actif": true
        };
        $("#container-fluid").data('indicateur', data);
        $("#container-fluid").load('indicateurs/details_indicateur.html');
    });
});

// Indicateur > de l'année en cours
    Highcharts.chart('indicateur1', {
        exporting: {
            chartOptions: { // specific options for the exported image
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                }
            },
            fallbackToExportServer: false
        },
        title: {
            text: "Carbone séquestré - Quantité de carbone séquestré par an"
        },
        xAxis: {
            title: {
            text: 'années'
            }
        },
        yAxis: {
            title: {
            text: 'valeurs'
            }
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2007
            }
        },
        series: [{
            name: ' ',
            data: [38, 39, 35, 55, 42, 49]
        },
        {
            name: 'situation de référence',
            data: [41, 41, 41, 41, 41, 41]
        }]
    });

// Indicateur récent
    Highcharts.chart('indicateur2', {
        exporting: {
            chartOptions: { // specific options for the exported image
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                }
            },
            fallbackToExportServer: false
        },
        title: {
            text: "Carbone séquestré - Quantité de carbone séquestré par an"
        },
        xAxis: {
            title: {
            text: 'années'
            }
        },
        yAxis: {
            title: {
            text: 'valeurs'
            }
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2007
            }
        },
        series: [{
            name: ' ',
            data: [38, 39, 35, 55, 42, 49]
        },
        {
            name: 'situation de référence',
            data: [41, 41, 41, 41, 41, 41]
        }]
    });

// Carte
	// layers
        var tiles = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png', {
            maxZoom: 18,
            attribution: 'Map data © <a href="https://www.cse.sn">CSE</a> contributors'
        });
        var streets  = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            id: 'mapbox.streets',
            attribution: 'Map data © <a href="https://www.cse.sn">CSE</a> contributors'
        });

    // map
        var map = L.map('map', {
            center: [14.497401, -14.452361999999994],
            zoom: 7,
            layers: [tiles]
        });
        var baseLayers = {
            "Tiles": tiles,
            "Streets": streets
        };
        L.control.layers(baseLayers).addTo(map);

        var l = L.layerGroup();
        l.addTo(map);
        // Add GeoJSON
        $.getJSON('assets/json/region.json', function (geojson) {
            L.choropleth(geojson, {
                valueProperty: 'shape_area',
                scale: ['white', 'red'],
                mode: 'q',
                style: {
                    color: '#fff',
                    weight: 2,
                    fillOpacity: 0.8
                },
                onEachFeature: function (feature, layer) {
                    switch (feature.properties.shape_area) {
                        case 24888810664.400002: layer.bindPopup('Région de ' + feature.properties.nom + ' : ' + 25); break;
                        case 4824093060.450000: layer.bindPopup('Région de ' + feature.properties.nom + ' : ' + 2); break;
                        case 11263213083.299999: layer.bindPopup('Région de ' + feature.properties.nom + ' : ' + 14); break;
                        case 5346910758.390000: layer.bindPopup('Région de ' + feature.properties.nom + ' : ' + 5); break;
                        case 6858796974.580000: layer.bindPopup('Région de ' + feature.properties.nom + ' : ' + 9); break;
                        default: layer.bindPopup('Région de ' + feature.properties.nom + ' : ' + 0);
                    }
                }
            }).addTo(map)
        });
        // get indicateur colors
        function getColor(d) {
            return d == 24888810664.400002 ? '#ff0000' :
                   d == 4824093060.450000 ? '#ffffff' :
                   d == 11263213083.299999 ? '#ff4040' :
                   d == 5346910758.390000 ? '#ffbfbf' :
                   d == 6858796974.580000 ? '#ff8080' :
                   '#ffffff';
        }
        // Add legend
	  	var legend = L.control({ position: 'bottomleft' })
	  	legend.onAdd = function (map) {
		    var div = L.DomUtil.create('div', 'info legend'),
            grades = [
                24888810664.400002,
                4824093060.450000,
                11263213083.299999,
                5346910758.390000,
                6858796974.580000
            ];
            div.innerHTML = '<u>Légende</u><br/>';
		    for (var i = 0; i < grades.length; i++) {
                if (grades[i] === 24888810664.400002) {
                    div.innerHTML += '<i class="fa" style="background:' + getColor(grades[i]) + '; width: 25px;">&nbsp;</i> ' + 25 + '<br>';
                }
                if (grades[i] === 4824093060.450000) {
                    div.innerHTML += '<i class="fa" style="background:' + getColor(grades[i]) + '; width: 25px;">&nbsp;</i> ' + 2 + '<br>';
                }
                if (grades[i] === 11263213083.299999) {
                    div.innerHTML += '<i class="fa" style="background:' + getColor(grades[i]) + '; width: 25px;">&nbsp;</i> ' + 14 + '<br>';
                }
                if (grades[i] === 6858796974.580000) {
                    div.innerHTML += '<i class="fa" style="background:' + getColor(grades[i]) + '; width: 25px;">&nbsp;</i> ' + 9 + '<br>';
                }
                if (grades[i] === 5346910758.390000) {
                    div.innerHTML += '<i class="fa" style="background:' + getColor(grades[i]) + '; width: 25px;">&nbsp;</i> ' + 5 + '<br>';
                }
            }
	    	return div;
	  	};
        legend.addTo(map);
