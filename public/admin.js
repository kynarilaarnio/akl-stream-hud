var sock = io();

var textboxes = document.getElementById("textboxes");

textboxes.childNodes.forEach(function(textbox) {
  textbox.addEventListener("change", function() {
    console.log(textbox.value);
    sock.emit("admin", { id: textbox.id, text: textbox.value });
  });
});
