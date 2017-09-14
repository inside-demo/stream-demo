const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function (req, res) { // При обращении к корневой странице
  res.sendFile(__dirname + '/index.html'); // отдадим HTML-файл
});
io.sockets.on('connection', function (socket) {

  socket.on('join', function(room){
    var clients = io.sockets.adapter.rooms[room];
    var numClients = clients !== undefined ? Object.keys(clients).length : 0;
    if(numClients == 0){
      socket.join(room);
    }else if(numClients == 1){
      socket.join(room);
      socket.emit('ready', room);
      socket.broadcast.emit('ready', room);
    }else{
      socket.emit('full', room);
    }
  });

  socket.on('offer', function (data) { 
    console.log(data);
    // При получении сообщения 'offer',
    // так как клиентское соединение в данном примере всего одно,
    // отправим сообщение обратно через тот же сокет
    // socket.emit('offer', data); 
    // Если бы было необходимо переслать сообщение по всем соединениям, 
    // кроме отправителя:
    socket.broadcast.emit('offer', data);
  });
  socket.on('answer', function (data) {
    socket.emit('answer', data);
  });
  socket.on('ice1', function (data) {
    socket.emit('ice1', data);
  });
  socket.on('ice2', function (data) {
    socket.emit('ice2', data);
  });
  socket.on('hangup', function (data) {
    socket.emit('hangup', data);
  });
});