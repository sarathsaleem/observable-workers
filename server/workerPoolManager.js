var numberOfTasks = 20,
    executed = [],    
    colorMap = {}, //assign random colors to each client to show task is inititated by which client
    workMap = {
        length: numberOfTasks,
        executed: executed,
        colorMap : colorMap
    };


function getRndmColor (){
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
};



var worker = require(__dirname + '/worker-server');

function workerPoolManager(sockets) {
    var connection = [];
    var devices = [];

    function emit(action, params) {
        connection.forEach(function (client) {
            client.socket.emit(action, params);
        });
    }


    function init(sockets) {
        console.log('Start Worker Pool Manager');
    }

    function startWorker(sockets) {
        worker.execute(function (data) {
            console.log('Sucess : executed one task from ' + sockets.id);
            executed.push(sockets.id);
            emit("task-updated", workMap);
        });
    }

    this.add = function (socket) {

        connection.push({
            socket: socket
        });

        devices.push(socket.id);
        
        colorMap[socket.id] = getRndmColor();

        //initlize the client 
        socket.emit('client-init', {
            id: socket.id,
            color : colorMap[socket.id]
        });

        //listen from client
        socket.on("start-worker", function () {
            startWorker(socket);
        });

        //broadcast to all client
        emit("connection-info", {
            data: devices
        });
        emit("task-updated", workMap);
    };

    this.remove = function (socket) {
        var index = devices.indexOf(socket.id);
        devices.splice(index, 1);
        emit("connection-info", {
            data: devices
        });
    };

    init(sockets);
}

module.exports = workerPoolManager;