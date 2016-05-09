module.exports = function ImpSwitch(implmentations, options) {
    var implmentationNames = Object.keys(implmentations);

    var selector = function defaultSelector(){
        return implmentationNames[0];
    };

    if(options.selector && typeof options.selector === 'function' ){
        selector = options.selector;
    }

    function switcheroo(functionName){
        return function switcher(options, success, failure) {
            var impName = selector(options);
            var implmentation = implmentations[impName];
            if (implmentation) {
                var functionCall = implmentation[functionName];
                if (typeof functionCall === 'function') {
                    return functionCall(options, success, failure);
                }
            }
            var impStr = 'implementation [' + impName + ']';
            return failure({
                message: 'invalid call, ' + implmentation ? 'function call failed as it was undefined for ' + impStr : impStr + ' did not exist'
            });
        };
    }

    function implSwitch(functionName){

        if(implmentationNames.indexOf(functionName) > -1){
            return implmentations[functionName];
        }
        else if(functionName === '__SuperSwitch'){
            var superSwitch = {};

            Object.keys(implmentations[implmentationNames[0]]).forEach(function fnNameIterator(fnName){
                superSwitch[fnName] = switcheroo(fnName);
            });

            return superSwitch;
        }
        else {
            return switcheroo(functionName);
        }
    }

    return implSwitch;
};