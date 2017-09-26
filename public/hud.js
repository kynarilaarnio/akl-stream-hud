var sock = io();

var bombStartTime;
var bombLeftTime;
var bombTime;
var bombPlantedTime;
var timer = document.getElementById("timer");
sock.on("message", function(data) {
  //console.log(data.phase_countdowns)
  if (data.phase_countdowns != null) {
    if (data.phase_countdowns.phase == "bomb") {
      bombTime = parseFloat(data.phase_countdowns.phase_ends_in);
      if (bombStartTime == undefined) {
        bombStartTime = parseFloat(data.phase_countdowns.phase_ends_in);
        console.log("planted", bombStartTime);
        var d = new Date();
        bombPlantedTime = d.getTime();
        console.log("planted time", bombPlantedTime);
      }
    } else if (data.phase_countdowns.phase == "over") {
      bombStartTime = undefined;
    } else if (data.phase_countdowns.phase == "freezetime") {
      timer.style.width = "0%";
    }
  }
});

function createBombTimer() {
  setInterval(function() {
    console.log("Left", bombLeftTime);

    if (bombLeftTime <= 5) {
      timer.style.backgroundColor = "red";
    } else if (bombLeftTime <= 10) {
      timer.style.backgroundColor = "yellow";
    } else {
      timer.style.backgroundColor = "green";
    }
    var d = new Date();
    var now = d.getTime();
    bombLeftTime = bombStartTime - (now - bombPlantedTime) / 1000;
    timer.style.width = bombLeftTime / bombStartTime * 100 + "%";
  }, 16);
}
document.addEventListener("DOMContentLoaded", function(event) {
  createBombTimer();
});
