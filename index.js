 module.exports = function ImpSwitch(implmentations) {
     
    var selector = function(){
        return Object.keys(implmentations)[0];
    };

    if(options.selector && typeof options.selector === 'function' ){
        selector = options.selector;
    }

    function implSwitch(functionName){
        return function(options, success, failure){
            var impName = selector(options);
            var implmentation = implmentations[impName];
            if(implmentation) {
                var functionCall = implmentation[functionName];
                if (typeof functionCall === 'function') {
                    return functionCall(options, success, failure);
                }
            }
            var impStr = 'implementation [' + impName + ']';
            return failure({
                message : 'invalid call, ' + implmentation?'function call failed as it was undefined for ' + impStr:impStr + ' did not exist'
            });
        }
    }
};