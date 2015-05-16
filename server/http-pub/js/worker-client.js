/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, exports, io, $ */

var socket = io.connect('');
socket.on("connect", function () {});

var clientId = null;

function displayInfo(connections) {
    var li = '';
    connections.data.forEach(function (data) {
        li += '<li>' + data + '</li>';
    });
    $("#main ul").html(li);
}

function updateWorkMap (workMap) {
    
    var works = '';
    
    for(var i =0 ;i < workMap.length; i++) {         
        works += '<div class="work"></div>';
    }    
    
    $(".works").html(works);    
    
    
    workMap.executed.forEach(function (clientId , i){
            $(".works .work").eq(i).css('background', workMap.colorMap[clientId]);
    });
    
}

function init (data) {
    clientId = data.id;
    $('body').css('background', data.color);
}

function startWorker () {
    socket.emit("start-worker", { id : clientId });
}

socket.on("connection-info", displayInfo);
socket.on("client-init", init);
socket.on("task-updated", updateWorkMap);


$(function () {
    $("#start").on('click', startWorker);
});
