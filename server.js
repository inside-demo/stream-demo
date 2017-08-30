var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);



app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/'));

server.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});


io.sockets.on('connection', function(socket){
    console.log("in the socket on server");

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('description', function(data){
        console.log(data);
    });
    socket.on('ice', function(data){
        // Do I attempt to add the candidate here like so?: myPeerConnection.addIceCandidate(new RTCIceCandidate(data));
    });
});