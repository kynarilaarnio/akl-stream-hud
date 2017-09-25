const sock = io();
let bomb_planted = false;
var bombStartTime;
var bombTime;
var timer = document.getElementById("timer");
sock.on("message", function(data){
    console.log(data.phase_countdowns)
    bombTime = parseFloat(data.phase_countdowns.phase_ends_in);
    console.log(bombTime, bombStartTime);
    if (data.phase_countdowns.phase == "bomb" && bombStartTime == undefined){
            bombStartTime = parseFloat(data.phase_countdowns.phase_ends_in);
            timer.style.width = "0%";
    }   
});

function createBombTimer(){
    //var timer = document.getElementById("timer");
    setInterval(function(){
        var asd = bombTime / bombStartTime * 100.0;
        if (bombTime <= 5) {
            timer.style.backgroundColor = "red";
        } else if (bombTime <= 10) {
            timer.style.backgroundColor = "yellow";
        } else {
            timer.style.backgroundColor = "green";
        }
        console.log(asd);
        //timer.style.width = asd + "%";
    }, 200)
}
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    createBombTimer();
  });