/*
 * I have 10 tasks to do, with N numer of workers
 *
 *
 *
 *
 *
 */


$(function () {

    var numberOfTasks = 10;

    $('.oneWorker .start').on('click', function () {
        var workers = createWorker(1);
         mapAndStartWorking(numberOfTasks, workers);
    });


    $('.fourWorker .start').on('click', function () {
        var workers = createWorker(4);
        mapAndStartWorking(numberOfTasks, workers);
    });

});


function runWork() {
    var worker = new Worker('js/worker.js');
    worker.addEventListener('message', function (e) {
        console.log(e.data);
    }, false);
    return worker;
}


function createWorker(workerNumber) {
    var workers = [];
    for (var i = 0; i < workerNumber; i++) {
        var worker = runWork();
        workers.push(worker);
    }

    return workers;
}


function mapAndStartWorking(numberOfTasks, workers) {

    for (var i = 0; i < numberOfTasks; i++) {

        var mapToTask = i % workers.length;

        workers[mapToTask].postMessage({
            method: 'GET'
        });
    }

}
