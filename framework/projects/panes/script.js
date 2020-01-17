(function() {
    var container = $(".container");
    var topImage = $(".top");
    var bar = container.find(".bar");
    var trueCLicking = false;

    bar.on("mousedown", function() {
        trueCLicking = true;
    });
    bar.on("mouseup", function() {
        trueCLicking = false;
    });

    container.on("mousemove", function(e) {
        if (trueCLicking == true) {
            var placement = e.pageX - container.offset().left;
            // console.log(e.pageX);
            console.log(placement);
            bar.css("left", placement);
            topImage.css("width", placement);
        }
    });
})();
