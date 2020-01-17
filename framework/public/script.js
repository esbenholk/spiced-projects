(function() {
  window.onload = window.onresize = function() {
    canvas = document.getElementById("paint");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  var text = [
    "HOUSE OF KILLING",
    "does art",
    "welcome to the internet",
    "u r soft",
    "i like u",
    "PSYCEDELIC SPIRITUAL POP ART",
    "R U LOST?",
    "ULTRA SOFT",
    "techno",
    "soft core",
    "ultra ponce",
    "JENNIFER ANISTON SUPERFANS",
    "HOUSE OF KILLING"
  ];
  $("body").on("mousemove", function(e) {
    var y = e.pageY;
    $("h1").html(text[Math.round(y / 50)]);
  });
})();
