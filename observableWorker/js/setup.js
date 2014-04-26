/*
 * 3. Observable workers
The Observer is a design pattern where an object maintains a list of objects depending on
it (observers), automatically notifying them of any changes to state. When a subject needs
to notify observers about something interesting happening, it broadcasts a notification to
the observers which can include specific data related to the topic of the notification. The
observer design pattern is suitable for distributed push-based notifications, because it
supports a clean separation between two different components or application layers, such
as a data source (business logic) layer and a user interface (display) layer. The pattern can
be implemented whenever a provider uses callbacks to supply its clients with current
information.
In observable worker we will approach the implementation of web workers to solve
parallel execution issue in an observable pattern. The main components of observable
workers approach is a synchronized worker pool module (WPM) which runs both in
client and on cloud. While initialization of the application a WPM instance will be
generated in client side and it will establish the connection with its cloud application.
This connection is maintained until the client application terminates. The cloud
application is supposed to run live and maintain 100% uptime like a usual web server and
it can accept connection from client to work like a paired pool. If the client application is
running offline the client WPM (CWPM) while not make any connection to cloud and
CWPM will run independently.
In this implementation approach web-workers are treated as an observer which can
update its core models and each worker will have the information about current state of
the pool. It has independent access to task lists and information about cloud pool if it is a
client worker and vice versa. A component called pool connection manager (PCM) will
keep track of connection state and data exchange mechanism. The data exchange format
will be application dependent , commonly it will be JSON ans in some cases more
complex types such as Blob or ArrayBuffer if the computational task is intense image
manipulation, sound processing, or heavy WebGL calculations.

4. High level architecture for worker pool module.
 A worker pool module has two main componet clinet pool and server pool. The cient pool have a collection of webworkers which are created at the time of initilization. A client can be initilized by padding data and function. var observerWorker = new ObserverWorker(workerjsfile, options); The optional parameter include server connection details , autentication , worker number configuration etc [details on section 5].

5. API methods and option.
6. Each worker as observables in pool.
7. Components of WPM and its functionality
8. Communication between CWPM observables
9. Connection establishment with CWPM – SWPM
10. Storage of data in client and cloud
11. Data synchronization with client and cloud storage.
12. Data exchange format
13. Auto update of data through observable notification.
14. Handling errors and connection lose.
15. Handling network latency.
16. Adoptable cost factors.
17. Benchmark examples
18. Conclusion and future works
 *
 *
 *
 *
 * API will be as follows
 ------------------------

 *
 *
 */

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

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
};

function add (no) {
    console.log(no);
    return no + 2;
}



var para = new Parallel([25,23,23]);

function getFebNumber() {
    console.log(arguments);
}

para.spawn(add).then(getFebNumber);





























