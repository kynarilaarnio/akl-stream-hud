const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const bodyParser = require('body-parser');

app.use(express.static("public"))
app.use(bodyParser.json());

app.get("/", function(req, res) {
  //res.sendFile("/hud.html");
})
app.post("*", function(req, res){
  res.sendStatus(200);
  console.log(req.body);
  io.sockets.emit(req.body)
})

app.listen(3000, function() {
  //console.log("Listening at http://" + ":" + app.get("port") );
})


