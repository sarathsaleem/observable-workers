/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, exports, io, $ */

var socket = io.connect('');
socket.on("connect", function () {});


function init(data) {

    data.data.forEach(function(d){
        $("#main").append(d +"</br>");
    });
}

$(function () {

    socket.on("event-grid", init);

});
