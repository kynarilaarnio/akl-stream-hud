const sock = io();
let bomb_planted = false;
var bombStartTime;
var bombTime;
sock.on("message", function(data){
    console.log(data.phase_countdowns)
    bombTime = parseFloat(data.phase_countdowns.phase_ends_in);
    console.log(bombTime, bombStartTime);
    if (data.phase_countdowns.phase == "bomb" && bombStartTime == undefined){
            bombStartTime = parseFloat(data.phase_countdowns.phase_ends_in);
    }
});

function createBombTimer(){
    var timer = document.getElementById("timer");
    setInterval(function(){
        console.log(bombTime / bombStartTime * 100.0);
        timer.style.width = (bombTime / bombStartTime * 100) + "%";
    }, 200)
}
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    createBombTimer();
  });