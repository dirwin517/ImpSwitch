/**
 * Created by daniel.irwin on 4/27/16.
 */
describe('Implementation Switch', function(){

    var impSwitch = require('../index');

    it('Happy Path', function(){
        var superVariable = 0;

        var switcheroo = impSwitch({
            real : {
                go: function go() {
                    superVariable = 'real';
                    return superVariable;
                }
            },
            mock : {
                go : function go(){
                    superVariable = 'mock';
                    return superVariable;
                }
            }
        }, {
            selector : function(){
                return superVariable==='real'?'mock':'real';
            }
        });


        if(switcheroo('go')() !== 'real'){
            throw 'failure, did not return real';
        }

        if(switcheroo('go')() !== 'mock'){
            throw 'failure, did not return mock';
        }

    });

    it(' :\'( Path', function(done){
        var switcheroo = impSwitch({

        }, {
            selector : function(){
                return 'doesnt matter';
            }
        });

        var failed = false;
        try{
            switcheroo('go')();
            failed = true;
        }
        catch(e){
            done();
        }

        if(failed){
           throw 'failed, did not throw error on invalid call';
        }
    });
});