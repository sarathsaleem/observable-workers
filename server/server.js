var io = require('socket.io'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = io.listen(server),
    workerPoolManager = require(__dirname + '/workerPoolManager'),
    sockets = [],
    path = require('path');

server.listen(3000);

app.use(express.static(path.join(__dirname, 'http-pub')));
app.use('/http-pub', express.static('http-pub'));

app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: './'
    });
});
var workerPool = new workerPoolManager([]);

io.sockets.on('connection', function (socket) {
    console.log('eeee', socket.id);
    sockets.push(socket);
    workerPool.add(socket);

     socket.on('disconnect', function (ss) {
         console.log('disconnected',  socket.id);
         workerPool.remove(socket);
     });


});
