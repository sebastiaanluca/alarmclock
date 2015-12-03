var debug = require('debug')('SebastiaanLuca:Controls:Controls');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Gpio = require('onoff').Gpio;

//

var Controls = function Controls() {
    
    var self = this;
    
    // Input
    var btnPlayPause = new Gpio(4, 'in', 'both');
    var btnPlayPausePressTime = (new Date().getTime());
    
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
        
        // Handle when button is released
        if (status != 1) {
            return;
        }
        
        // Handle contact bounce
        // @ http://arduino.stackexchange.com/questions/408/why-does-my-sketch-report-too-many-button-presses
        // TODO: move to separate Button module so we can reuse it?
        var timeDifference = (new Date().getTime()) - btnPlayPausePressTime;
        
        if (timeDifference < 320) {
            debug('Contact bounce detected, skipping button press!');
            
            return;
        }
        
        // Handle button press
        debug('Button pressed');
        self.emit('playPauseButtonPressed');
        
        // Save current time for future reference
        btnPlayPausePressTime = (new Date().getTime());
    });
    
    
    
    init();
    
    // Gracefully exit on CTRL+C and errors
    process.on('forceQuitApplication', quit);
    
};

//

// Class inherits EventEmitter so we can dispatch and listen to events on the object itself
util.inherits(Controls, EventEmitter);

module.exports = new Controls();