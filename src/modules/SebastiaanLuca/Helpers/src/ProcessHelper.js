var debug = require('debug')('SebastiaanLuca:Helpers:ProcessHelper');

var ProcessHelper = function () {
    
    var quit = function () {
        debug('Exiting application.');
        
        process.emit('forceQuitApplication');
        
        // Give the rest of the application some time to handle their affairs
        setTimeout(function () {
            debug('QUITTING - FINAL NOTICE');
            // Gracefully quit application
            process.exit();
        }, 1000)
    };
    
    var quitWithError = function (error) {
        debug(error);
        
        quit();
    };
    
    process.on('SIGINT', quit);
    process.on('uncaughtException', quitWithError);
    
};

// Singleton
module.exports = new ProcessHelper();


