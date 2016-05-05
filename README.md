# ImpSwitch
Switch Between Implementations

  Assumptions:

        implementation functions should follow
            function(options, successCallback, failureCallback)


Example:

    var ImpSwitch = require('impswitch');

    var switch = ImpSwitch({
        real : {
            go: function go(options, success, failure) {
                success('Real Implementation');
            }
        },
        mock : {
            go : function go(options, success, failure) {
                success('Mock Implementation');
            }
        },
        {
            selector : function selector(options) {
                return options.id > 0 ? 'real' : 'mock';
            }
        }
    });


Call

    function success(data){
        console.log(data);
    }

    function failure(err){
        console.error(err);
    }

    switch('go')({ id : -1 }, success, failure)

    switch('go')({ id : 1 }, success, failure)


Expected Output (ignoring any asynchronous operations):

    Mock Implementation

    Real Implementation