(function() {
    Handlebars.templates = Handlebars.templates || {};
    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );
    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    /////////////////////////this is a copied from handlebar script///////do not change////
    ////////////////////////////////////////////////////////////////

    console.log("sanity check", $);
    var userInput;
    var artistOrAlbum;
    var nextUrl;
    var htmlElements = "";
    var thereIsResponse = false;

    $("#searchbutton").on("click", function() {
        htmlElements = "";
        getResults("https://elegant-croissant.glitch.me/spotify");
        $("#more").css("visibility", "invisible");
    });
    $("input").on("keydown", function(e) {
        console.log(e.keyCode);
        if (e.keyCode == 13) {
            htmlElements = "";
            getResults("https://elegant-croissant.glitch.me/spotify");
            $("#more").css("visibility", "invisible");
        }
    });

    function getResults(address) {
        userInput = $("input[name='user-input']").val();
        artistOrAlbum = $("select").val();
        console.log(userInput, artistOrAlbum);
        $.ajax({
            url: address,
            method: "GET",
            data: {
                query: userInput,
                type: artistOrAlbum
            },
            success: function(response) {
                // what happens once your request has been succesful
                // $("results-container").html(response);
                response = response.artists || response.albums;

                for (var i = 0; i < response.items.length; i++) {
                    var imageUrl =
                        "https://previews.123rf.com/images/poco_bw/poco_bw1110/poco_bw111000048/10859058-young-mixed-race-man-looking-out-for-something.jpg";
                    if (response.items[i].images[0]) {
                        //checking if there is content/value in the array
                        imageUrl = response.items[i].images[0].url;
                    }
                    htmlElements +=
                        '<div> <a href= "' +
                        response.items[i].external_urls.spotify +
                        '"<div class="results">' +
                        response.items[i].name +
                        "</div>" +
                        "<img src=" +
                        "'" +
                        imageUrl +
                        "' width=100px height=100px" +
                        "> </a> </div>";
                }

                nextUrl =
                    response.next &&
                    response.next.replace(
                        "https://api.spotify.com/v1/search",
                        "https://elegant-croissant.glitch.me/spotify"
                    );

                if (response.next) {
                    $("#more").css("visibility", "visible");
                    thereIsResponse = true;

                    // htmlElements += "<br> <button> wanna watch more? </button>";
                }
                $("#results-container").html(htmlElements);
                // console.log(response.items[0].external_urls.spotify);
                // $(".handlebarResults").html(Handlebars.templates.results(items));

                // if (location.search.indexOf("scroll=infinite") > -1 && thereIsResponse == true) {}

                if (thereIsResponse == true) {
                    checkScrollPosition();
                }

                function checkScrollPosition() {
                    setTimeout(function() {
                        if (
                            $(document).scrollTop() + $(window).height() >=
                            $(document).height() - 400
                        ) {
                            getResults(nextUrl);
                        } else {
                            checkScrollPosition();
                        }
                    }, 500);
                }
            }
        });
    }

    $("#more").on("click", function() {
        console.log(nextUrl);
        getResults(nextUrl);
    });
})();

// if (location.search.indexOf("scroll=infinite")) {
//     console.log("infinite scroll");
// }
// var s = new URLSearchParams(location.search)
// s.get("scroll")
// "infintely"

//there is an event called scroll, that happens too much- that can be throttled "debouncing", setTimeout for eventhandler on scroll that only takes the last scroll
//placement of scrolll can be found using $(document).height(), $(window).height(), document.body.clientheight and $(document).scrollTop();
// $(document).scrollTop() + $(window).height() >= $(document).height()-100;
