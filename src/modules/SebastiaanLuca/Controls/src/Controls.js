var debug = require('debug')('SebastiaanLuca:Controls:Controls');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Gpio = require('onoff').Gpio;

//

var Controls = function Controls() {
    
    var self = this;
    
    // Input
    var btnPlayPause = new Gpio(4, 'in', 'both');
    
    // Output
    var appRunningIndicatorLed = new Gpio(25, 'out');
    
    
    
    var init = function () {
        // Turn on LED indicating application is running
        appRunningIndicatorLed.writeSync(1);
    };
    
    var quit = function () {
        debug('Cleaning up our mess.');
        
        // Clear perhipherals
        btnPlayPause.unexport();
        appRunningIndicatorLed.unexport();
    };
    
    
    
    // Watch play/pause button input
    btnPlayPause.watch(function (err, status) {
        if (err) {
            throw err;
        }
        
        self.emit('playPauseButtonPressed', {isPressed: status == 1});
        
        if (status == 1) {
            debug('Button pressed');
            return;
        }
        
        debug('Button released');
    });
    
    
    
    init();
    
    // Gracefully exit on CTRL+C and errors
    process.on('forceQuitApplication', quit);
    
};

//

// Class inherits EventEmitter so we can dispatch and listen to events on the object itself
util.inherits(Controls, EventEmitter);

module.exports = new Controls();