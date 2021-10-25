/* Configuration des URLs */
var configUrl = {
  home: "dashboard/dashboard.html",
  administration: "administration/administration.html",
  beneficiaires: "beneficiaires/beneficiaires.html",
  sectoriels: "sectoriels/sectoriels.html",
  indicateurs: "indicateurs/indicateurs.html",
  cartotheque: "cartotheque/cartotheque.html",
  videotheque: "videotheque/videotheque.html",
  rapports: "rapports/rapports.html"
}
/* Fin config   */

$(function() {
  "use strict";

  //sidebar menu js
  $.sidebarMenu($('.sidebar-menu'));

  // === toggle-menu js
  $(".toggle-menu").on("click", function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  // === sidebar menu activation js
  $(function() {
    for (var i = window.location, o = $(".sidebar-menu a").filter(function() {
        return this.href == i;
    }).addClass("active").parent().addClass("active"); ;) {
      if (!o.is("li")) break;
      o = o.parent().addClass("in").parent().addClass("active");
    }
  }),

  /* Back To Top */

  $(document).ready(function(){
    // Recupération de la page en cours
    var hash = window.location.hash;
    if(hash.startsWith('#')){
      hash = hash.substr(1);
    }
    if(configUrl[hash] !== undefined){
      $("#container-fluid").load(configUrl[hash]);
    }else{
      $("#container-fluid").load("dashboard/dashboard.html");
    }
    // Fin Récupération

    $(window).on("scroll", function(){
      if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn();
      } else {
        $('.back-to-top').fadeOut();
      }
    });
    $('.back-to-top').on("click", function(){
      $("html, body").animate({ scrollTop: 0 }, 600);
      return false;
    });
  });

  $(function () {
    $('[data-toggle="popover"]').popover()
  })
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
});
