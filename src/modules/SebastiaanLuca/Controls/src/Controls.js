var debug = require('debug')('SebastiaanLuca:Controls:Controls');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Gpio = require('onoff').Gpio;
var Button = require('modules/SebastiaanLuca/Controls/src/Peripherals/Button.js');

//

var Controls = function Controls() {
    
    var self = this;
    
    // Input
    var btnPlayPause = new Button(17);
    
    // Output
    var appRunningIndicatorLed = new Gpio(25, 'out');
    
    
    
    var init = function () {
        // Turn on LED indicating application is running
        appRunningIndicatorLed.writeSync(1);
    };
    
    var quitHandler = function () {
        debug('Cleaning up our mess.');
        
        // Clear perhipherals
        appRunningIndicatorLed.unexport();
    };
    
    
    
    btnPlayPause.on('pressed', function () {
        self.emit('playPauseButtonPressed');
    });
    
    // Gracefully exit on CTRL+C and errors
    process.on('forceQuitApplication', quitHandler);
    
    
    
    init();
    
};

//

// Class inherits EventEmitter so we can dispatch and listen to events on the object itself
util.inherits(Controls, EventEmitter);

module.exports = new Controls();