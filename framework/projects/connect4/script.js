//
// 1. know who's turn it is
// put players class into lowest available column space
// for each turn: check for win
//if there is no victory: change players

(function() {
    var currentPlayer = "player1";
    var slots = $(".hole"); //give me 42 slots
    var cols = $(".column");
    var cursor = document.querySelector(".cursor");

    cols.on("click", function(e) {
        var col = $(e.currentTarget);
        var slotsInCol = col.children().find(".hole");
        var foundEmptySlot;
        for (var i = 6; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);
                foundEmptySlot = true;
                break;
            }
        }
        if (!foundEmptySlot) {
            return;
        }
        var slotsInRow = $(".row" + i).find(".hole");
        if (checkForVictory(slotsInCol)) {
            doVictoryDance();
            console.log("it knows a winner/column");
            return;
        } else if (checkForVictory(slotsInRow)) {
            doVictoryDance();
            console.log("it knows a winner /row");
            return;
        } else if (checkDiagonally()) {
            doVictoryDance();
        } else {
            switchPlayers();
        }

        function checkDiagonally() {
            for (var j = 0; j < slots.length; j++) {
                var n = j - 24;
                var m = j - 18;
                while (n < 0) {
                    n += 8;
                }
                while (m < 0) {
                    m += 6;
                }

                var up2Down = slots.eq(n);
                var down2Up = slots.eq(m);
                while (n < 50) {
                    up2Down = up2Down.add(slots.eq(n));
                    n += 8;
                }
                while (m < 50) {
                    down2Up = down2Up.add(slots.eq(m));
                    m += 6;
                }
                if (checkForVictory(up2Down)) {
                    return true;
                } else if (checkForVictory(down2Up)) {
                    console.log("diagonal registered");
                    return true;
                }
                // if (
                //     up2Down
                //         .eq(0)
                //         .parent()
                //         .index() +
                //         4 ==
                //     up2Down
                //         .eq(up2Down.length)
                //         .parent()
                //         .index()
                // ) {
                //     if (checkForVictory(up2Down)) {
                //         return true;
                //     } else if (checkForVictory(down2Up)) {
                //         console.log("diagonal registered");
                //         return true;
                //     }
                // }
            }
        }
    });

    function doVictoryDance() {
        $(".column").off();
        setTimeout(function() {
            $(".winner").css("visibility", "visible");
            $(".column")
                .find("." + currentPlayer)
                .addClass("animation");
            $(".winnermessage").css("visibility", "visible");
            console.log($(currentPlayer));
            $(".cursor").addClass("cursorAnimation");
        }, 0);
    }

    function checkForVictory(arraylikeObject) {
        var count = 0;
        for (var p = 0; p < arraylikeObject.length; p++) {
            if (arraylikeObject.eq(p).hasClass(currentPlayer)) {
                count++;
                if (count == 4) {
                    console.log(arraylikeObject);
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
            $(".cursor").addClass("player2");
        } else {
            currentPlayer = "player1";
            $(".cursor").removeClass("player2");
            $(".cursor").addClass("player1");
        }
    }

    $(".winner").on("click", function() {
        location.reload();
        console.log("click on winner function");
    });

    document.addEventListener("mousemove", function(ev) {
        cursor.style.left = ev.clientX + "px";
        cursor.style.top = ev.clientY + "px";
    });
})();
