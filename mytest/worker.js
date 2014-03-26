function fib(n) {
    return n < 2 ? 1 : fib(n - 1) + fib(n - 2);
}

var Work = function () {
    var perfomance = 0;
    var start = Date.now();

    function populate() {
        perfomance++;
        var square = fib(25);
        if (perfomance < 1000) {
            populate();
        }
    }

    populate();

    var end = Date.now();

    return (end - start);

};


function myWork(no) {
    var fibonacci = (function () {
        var arr = [0, 1];
        return function () {
            var num = arr[arr.length - 1],
                len = arr.length;
            arr.push(arr[len - 1] + arr[len - 2]);
            return num;
        };
    }());


    for (var x = 0; x < no; x++) {
        fibonacci();
    }
    return fibonacci();
}


function getMyWork() {
    var perfomance = 0;
    var start = Date.now();
    var square;
    function populate() {
        perfomance++;
        square = myWork(1000);
        if (perfomance < 1000) {
            populate();
        }
    }

    populate();

    var end = Date.now();

    return (end - start) +'----'+ square;
}

this.addEventListener('message', function (e) {

    if (e.data.method === 'GET') {
        this.postMessage({
            work: Work(),
            index: e.data.index
        });
    }

}, false);