
***In development - library not avaliable***


Observable Worker API
=====================

Initialize an observable worker
-------------------------------
An observable worker can be initialized as follows

    var obWorker = new ObservableWorker(workerjs, options);

**workerjs** can be worker file or a js function reference. But with following conditions

1. the workerjs should be a webworker compatible file

        var worker = new Webworker(workerjsfile);
        worker.postMessage(data);
        worker.onmessage(function(processedData) { });

2. or it can be a normal function reference which doesn't have any external dependency like global varaiable, external modules, plugins, dom access etc. The function shoud return the expected result.

        var processedData = workerjs(data);


**Options**

    {
        server : {
            url:'http://localhost:8888/workers',
            auth : 'session'| 'none' | 'token',
            silentfail : true // on server connection lost be silent or throw error and restart with out server

        },
        maxWorkers: // the number of maximun worker in client and server
    }



Assigning data
------------------

    obWorker.data(data, options);


1.  **data**  - data to processing which can pass to workerfile to get processed and return the result on on-message.
data can be an array or string compatible with worker function.

2. **options**

        {
         id: 1 ,
         processTime: false,//default
         workerid : false,//default
         async : false
        }
    1.  **id** -  a unique identifier that will return with result on complete , can be an array if data is an array , if not mentioned then array index will be returned.
   2.    **processTime** - a boolean to mention whether to get back the processed time.
   3.    **workerId** - a boolean to mention whether to get back the worker id.
   4.    **async** -  a boolean to mention whether to call the on-complete on each data if data is an array or on complete of all the data.


Subscribe to  processed data
------------------------

After the function call is completed  *subscribe* function will be called with  callback


     obWorker.subscribe(function(result, details, err){

     });

**Eg: **

    var obWorker = new ObservableWorker(getSquare).data([10,20,30,40]);

    obWorker.subscribe(function(result, resultdetails, err){
        console.log(result,resultdetails);
        //[100,400,900,1600]
    });
**Eg: with "async : true"**

    function getSquare(x){
     return x*x;
    }

    var obWorker = new ObservarWorker(getSquare).data([10,20,30,40],{ async: true });

    obWorker.subscribe(function(result, resultdetails, err){
        console.log(result,resultdetails);
    });
    // 100,0
    // 400,1
    // 1600,3
    // 900,2
the *subscribe* will get triggered when ever a function call on any of the data is completed with *async:true*

Getting observable map
----------------------

If *subscribe* is true an observable map of data will be available to **obWorker** object. and some data is on process the result will be ""



    var observableMap = obWorker.getMap();
    log(observableMap);
    //{data:[10,20,30,40], result:[100,400,900,1600]};

If you want to change the data at particular index use *'setIndexData'* , this will also trigger subscription.

    obWorker.setIndexData(7,2);


**Other API methods**

To check whether all data in array is processed or not

    obWorker.inProcess();

 To check whether worker is connected to server

    obWorker.isConnected();

On server error/connection lost etc

    obWorker.onServerError(function(err){ });

Return an object with worker id list

    obWorker.getWorkerDetails();
       // {
            client : [1234,1235,1236],
            server : []
          }
