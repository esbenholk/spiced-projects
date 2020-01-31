(function() {
  window.onload = window.onresize = function() {
    canvas = document.getElementById("paint");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  // $("#houseofkillinghome").addEventListener("click", function(e) {
  //     console.log("clicked on a french girl");
  // });

  var canvas = document.getElementById("paint");
  var ctx = canvas.getContext("2d");

  document.addEventListener("mousemove", function(e) {
    var gradient = ctx.createRadialGradient(
      e.pageX,
      e.pageY,
      30,
      e.pageX,
      e.pageY,
      400
    );
    if (window.location.pathname == "/houseofkilling") {
      gradient.addColorStop(0, `rgba(0,0,255,0.1)`);
      gradient.addColorStop(0.5, `rgba(0,200,100,0.1)`);
      gradient.addColorStop(1, `rgba(20,0,20, 1)`);
    } else {
      gradient.addColorStop(0, `rgba(255,0,20,0.1)`);
      gradient.addColorStop(0.5, `rgba(255,0,200,0.1)`);
      gradient.addColorStop(1, `rgba(20,0,20, 1)`);
    }

    let x = e.pageX;
    let y = e.pageY;
    // console.log(x, y);
    // console.log(radius);

    ctx.beginPath();
    ctx.arc(x, y, 200, 0, Math.PI * 2); //5 arguments: x,y,radius, startangle, accumulated angle
    ctx.filter = "blur(10px)";
    ctx.fillStyle = gradient;
    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.fill();
    ctx.stroke();
  });
})();
