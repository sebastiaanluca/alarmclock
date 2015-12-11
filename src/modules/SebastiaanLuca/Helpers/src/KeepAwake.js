var debug = require('debug')('SebastiaanLuca:Helpers:KeepAwake');

var KeepAwake = function () {
    
    var keepAwake = function () {
        debug('Exiting application.');
        
        setInterval(function () {
            debug('Trigger to keep your Pi and NodeJS process awake! It is now %s', (new Date()));
        }, 1000 * 60 * 20);
    };
    
    keepAwake();
    
};

// Singleton
module.exports = new KeepAwake();