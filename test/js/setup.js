/*
 * I have 10 tasks to do, with N numer of workers
 *
 */

var startOne = 0,
    startFour = 0;
var numberOfTasks = 10;


var oneWorker = function () {

    // create a worker pool with 1 worker
    var workerPool = createWorkerPool(1);
    startOne = Date.now();

    // Assign works to workerPool
    mapAndStartWorking(numberOfTasks, workerPool, 'oneWorker');
};


var nWorkerPool = function () {
    // create a worker pool with 4 worker
    var workerPool = createWorkerPool(4);
    startFour = Date.now();

    // Assign works to workerPool 
    mapAndStartWorking(numberOfTasks, workerPool, 'fourWorker');
};


/* Create and return array of workers
 *
 * @param : number of workers to create
 * @retun : array of worker
 *
 */
function createWorkerPool(workerNumber) {
    var workers = [];
    for (var i = 0; i < workerNumber; i++) {
        var worker = runWork();
        workers.push(worker);
    }

    return workers;
}


function runWork() {
    var worker = new Worker('js/worker.js');
    //read response
    worker.addEventListener('message', function (e) {
        displayResponse(e.data);
    }, false);
    return worker;
}

function mapAndStartWorking(numberOfTasks, workers, name) {

    for (var i = 0; i < numberOfTasks; i++) {

        var mapToTask = i % workers.length;

        workers[mapToTask].postMessage({
            method: 'GET',
            index: { // to identify who is the caller
                i: i,
                name: name
            }
        });
    }
}


// UI with jquery

$(function () {

    $('.oneWorker .start').on('click', oneWorker);
    $('.fourWorker .start').on('click', nWorkerPool);

});

function displayResponse(data) {
    var taskEle;

    if (data.index.name === 'oneWorker') {
        taskEle = $('.oneWorker .fibval').eq(data.index.i);
    }

    if (data.index.name === 'fourWorker') {
        taskEle = $('.fourWorker .fibval').eq(data.index.i);
    }

    taskEle.addClass('done');
    taskEle.text(data.work.time + 'm-sec');


    //if all tasks is completed
    if ($('.oneWorker .fibval.done').length === 10 && !$('.oneWorker .info').hasClass('done')) {
        $('.oneWorker .info').addClass('done').find('span').text(Date.now() - startOne);
    }

    if ($('.fourWorker .fibval.done').length === 10 && !$('.fourWorker .info').hasClass('done')) {
        $('.fourWorker .info').addClass('done').find('span').text(Date.now() - startFour);
    }



}