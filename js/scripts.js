$(function () {
    console.log("Doge game ready!");

    $("#high-score").text(localStorage.getItem("dogeHighScore") || 0);

    $("#doge-meme-pic").draggable({
        containment: "#containment-wrapper",
        scroll: false,
        drag: function () {
            calculateWow();
        },
        stop: function () {
            calculateWow();
            saveHighScore(parseInt($("#score-display").text()));
        }
    });

    function calculateWow() {
        let pos = $("#doge-meme-pic").position();
        let multiplier = 1;

        if (pos.left > 300) {
            multiplier = 2;
            $("#containment-wrapper").css("background", "#e8f5e9");
        } else if (pos.top > 250) {
            multiplier = 3;
            $("#containment-wrapper").css("background", "#fff3e0");
        } else {
            $("#containment-wrapper").css("background", "#ffffff");
        }

        let score = Math.floor((pos.top + pos.left) * multiplier);

        $("#score-display").text(score);

        let percent = Math.min((score / 1000) * 100, 100);
        $("#score-progress").css("width", percent + "%");

        if (score < 300) {
            $("#status-message").text("Doge is warming up...");
        } else if (score < 600) {
            $("#status-message").text("Wow! Doge is gaining power!");
        } else if (score < 900) {
            $("#status-message").text("Much skill. Very drag.");
        } else {
            $("#status-message").text("MAXIMUM WOW ACHIEVED! 🏆");
        }

        $("#wow-output").html(
            score < 500
                ? `<h5>not much wow (${score})</h5>`
                : `<h5>SO MUCH WOW (${score})</h5>`
        );
    }

    function saveHighScore(score) {
        let highScore = localStorage.getItem("dogeHighScore") || 0;
        if (score > highScore) {
            localStorage.setItem("dogeHighScore", score);
            $("#high-score").text(score);
        }
    }
});
