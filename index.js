const express = require("express");
const app = express();
const path = require("path");
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

io.on("connection", function(socket){
  //console.log(socket);

})

io.on("admin", function(data){
  //handle ui change request and send it to all clients.
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/hud.html");
})

app.get("/admin", function(req, res){
  res.sendFile(__dirname + "/public/admin.html")
})

app.post("*", function(req, res){
  res.sendStatus(200);
  //console.log(req.body);
  io.sockets.emit("message", req.body);
})


server.listen(3000, function() {
  //console.log("Listening at http://" + ":" + app.get("port") );
})


