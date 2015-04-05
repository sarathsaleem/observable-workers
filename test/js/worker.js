function fib(n) {
    return n < 2 ? 1 : fib(n - 1) + fib(n - 2);
}

var Work = function (hardness) {
    var loop = 0;
    var start = Date.now();

    hardness = hardness || 1000;

    function populate() {
        loop++;

        var square = fib(25);

        if (loop < hardness) { // find 25 fibonacci number for 'hardness' number of times
            populate();
        }
    }

    populate();

    var end = Date.now();

    return {
        message: "Computed 25th fibonacci for " + hardness + " times ",
        time: (end - start)
    };

};

this.addEventListener('message', function (e) {

    if (e.data.method === 'GET') {
        this.postMessage({
            work: Work(e.data.hardness),
            index: e.data.index
        });
    }
}, false);
