var execButton = document.getElementById("execButton");
var execBox = document.getElementById("execBox");

execButton.onclick = function() {
    var program = "";
    var lines = execBox.value.split("\n");
    for (var line of lines) {
        var compiled = parseInt(compileLine(line), 16);
        console.log(compiled);
    }
}