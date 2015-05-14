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

        devices.push(socket.handshake.headers['user-agent']);

        emit("event-grid", {data: devices });
    };

    init(sockets);
}

module.exports = workerPoolManager;
