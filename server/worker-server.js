/*
 * I have 10 tasks to do, with N numer of workers
 *
 */
var worker = function () {
    
    var hardness = 20;

    var workerpool = require('workerpool');

    // create a worker pool using an external worker script
    var pool = workerpool.pool(__dirname + '/task-server-copy.js');
    
    
    this.execute = function (cb) {

        // run registered functions on the worker via exec
        pool.exec('fibonacci', [hardness])
            .then(function (result) {
                cb('Result: ' + result); 
            
                pool.clear(); // clear all workers when done
            });
    };
};


module.exports = new worker();