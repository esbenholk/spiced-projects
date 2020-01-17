(function() {
    var headlines = document.getElementById("headlines");
    var links = headlines.getElementsByTagName("a");
    var pics = document.getElementsByClassName("pic");
    var buttons = document.getElementsByClassName("circlebutton");
    var current = 0;
    var currentlyTransitioning;
    var anim;
    var timer;

    var left = headlines.offsetLeft;

    moveHeadLines();
    function moveHeadLines() {
        left--;
        if (left <= -links[0].offsetWidth) {
            left += links[0].offsetWidth;
            headlines.appendChild(links[0]);
        }
        headlines.style.left = left + "px";
        anim = requestAnimationFrame(moveHeadLines);
    }
    headlines.addEventListener("mouseenter", function() {
        cancelAnimationFrame(anim);
    });

    headlines.addEventListener("mouseleave", function() {
        moveHeadLines();
    });

    // moveHeadLines();
    //
    // function moveHeadLines() {
    //     var left = headlines.offsetLeft;
    //     left--;
    //     if (left <= -links[0].offsetWidth) {
    //         left += links[0].offsetWidth;
    //         headlines.appendChild(links[0]);
    //     }
    //     headlines.style.left = left + "px";
    //     anim = requestAnimationFrame(moveHeadLines);
    // }
    // headlines.addEventListener("mouseenter", function() {
    //     cancelAnimationFrame(anim);
    // });
    // headlines.addEventListener("mouseleave", function() {
    //     moveHeadLines();
    // });

    timer = setTimeout(rotation, 3000);

    for (var b = 0; b < buttons.length; b++) {
        buttons[b].addEventListener("click", function(e) {
            console.log("buttonclick");
            if (e.target.classList.contains("on")) {
                return;
            }
            if (currentlyTransitioning == true) {
                return;
            }
            clearTimeout(timer);
            //e.target.id-replace()
            for (var b = 0; b < buttons.length; b++) {
                if (buttons[b] == e.target) {
                    rotation(b);
                    // pics[current].classList.remove("onscreen");
                    // pics[current].classList.add("offscreen");
                    // pics[b].classList.add("onscreen");
                }
            }
        });
    }

    function rotation(arg) {
        currentlyTransitioning = true;
        // for (var i = 0; i < pics.length; i++) {
        //   pics[i].classList.add("onscreen");
        pics[current].classList.remove("onscreen");
        pics[current].classList.add("offscreen");
        buttons[current].classList.remove("on");

        if (typeof arg != "undefined") {
            current = arg;
        } else {
            current++;
            if (current >= pics.length) {
                current = 0;
            }
        }

        pics[current].classList.add("onscreen");
        buttons[current].classList.add("on");

        // console.log(current);
    }

    for (var i = 0; i < pics.length; i++) {
        pics[i].addEventListener("transitionend", function(e) {
            if (e.target.classList.contains("offscreen")) {
                e.target.classList.remove("offscreen");
                timer = setTimeout(rotation, 3000);
            }
            currentlyTransitioning = false;
        });
    }
})();
