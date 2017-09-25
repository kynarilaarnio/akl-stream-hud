const express = require("express");
const app = express();
const io = require("socket.io")(app);

app.use(express.static("public"))

app.get("/", function(req, res) {
  if (req.method == "POST") {
    res.writeHead(200, { "Content-Type": "text/html" });
    io.sockets.emit(req.body)
  }
  else {
    res.render("hud.html")
  }
})

app.listen(3000, function() {
  console.log("Listening at http://" + host + ":" + port);
})


