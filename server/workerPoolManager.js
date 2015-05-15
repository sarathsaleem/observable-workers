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

    this.add = function (socket) {

        connection.push({
                socket: socket
            });

        devices.push(socket.id);

        emit("connection-info", {data: devices });
    };
    
    this.remove = function (socket) {
        var index = devices.indexOf(socket.id);
        devices.splice(index, 1);
        emit("connection-info", {data: devices });
    };

    init(sockets);
}

module.exports = workerPoolManager;
