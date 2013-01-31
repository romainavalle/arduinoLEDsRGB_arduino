
var five = require("johnny-five"),
    board = new five.Board(),
    client = require('socket.io-client');

var socket;
board.on("ready", function() {
  var red = new five.Led(11);
  var green = new five.Led(10);
  var blue = new five.Led(9);
  board.repl.inject({
    ledGreen: green,
    ledBlue: blue,
    ledRed: red
  });
  board.on('changeLight',function(obj){
    if(obj.green==null)obj.green=0;
    if(obj.blue==null)obj.blue=0;
    if(obj.red==null)obj.red=0;
    console.log(obj)
    ledGreen.brightness(obj.green*255);
    ledBlue.brightness(obj.blue*255);
    ledRed.brightness(obj.red*255);
  });
});

socket = client.connect('http://192.168.0.39:8081');  
socket.on('response', function (e) {
    board.emit('changeLight', e.obj);
}); 

