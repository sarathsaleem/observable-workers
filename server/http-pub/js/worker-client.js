/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, exports, io, $ */

var socket = io.connect('');
socket.on("connect", function () {});


function init(connections) {
    var li = '';
    connections.data.forEach(function (data) {
        li += '<li>' + data + '</li>';
    });
    $("#main ul").html(li);
}

$(function () {
    socket.on("connection-info", init);

});