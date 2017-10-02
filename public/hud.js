var sock = io();

var bombStartTime;
var bombLeftTime;
var bombTime;
var bombPlantedTime;
var defuseStartTime;
var timer = document.getElementById("timer");
var defuse = document.getElementById("defuse");
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
      hideDefuseBar()
    } else if (data.phase_countdowns.phase == "freezetime") {
      timer.style.width = "0%";
    }
    if (data.phase_countdowns.phase == "defuse" && defuseStartTime === undefined ) {
        defuse.style.visibility = "visible";
        defuseStartTime = data.phase_countdowns.phase_ends_in;
        defuse.style.transition = "width " + defuseStartTime + "s linear"
        defuse.style.width = "0%"
    } 
    else if (data.phase_countdowns.phase == "bomb" && defuseStartTime !== undefined) {
      hideDefuseBar();
    }
  }
});

sock.on("admin", function(data){

});


function createBombTimer() {
  setInterval(function() {
    //console.log("Left", bombLeftTime);

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

function hideDefuseBar() {
  defuseStartTime = undefined;
  defuse.style.transition = "width 0s linear";
  defuse.style.width = "100%";
  defuse.style.visibility = "hidden";
}