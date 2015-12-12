var debug = require('debug')('SebastiaanLuca:Controls:Controls');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Gpio = require('onoff').Gpio;
var PwmGpio = require('pigpio').Gpio;

var Button = require('modules/SebastiaanLuca/Controls/src/Peripherals/Button.js');

//

var Controls = function Controls() {
    
    var self = this;
    
    // Input
    var btnPlayPause = new Button(17);
    var btnPlayPreviousTrack = new Button(27);
    var btnPlayNextTrack = new Button(22);
    
    var btnVolumeDown = new Button(23);
    var btnVolumeUp = new Button(24);
    
    // Output
    var appRunningIndicatorLed = new Gpio(25, 'out');
    var playingIndicatorLed = new Gpio(9, 'out');
    var alarmIndicatorLed = new PwmGpio(11, {mode: Gpio.OUTPUT});
    
    var alarmPulseInterval;
    var alarmPulseValue = 0;
    var alarmPulseIncrement = 2;
    
    
    
    var init = function () {
        //
        self.enableAlarmIndicatorLedPulse(true); // TODO: move to event handler, alarm event
    };
    
    var quitHandler = function () {
        debug('Cleaning up our mess.');
        
        // Clear perhipherals
        appRunningIndicatorLed.unexport();
        playingIndicatorLed.unexport();
        // alarmIndicatorLed.close(); // Unsupported
    };
    
    
    
    // Play/pause
    btnPlayPause.on('pressed', function () {
        self.emit('playPauseButtonPressed');
    });
    
    // Previous/next
    btnPlayPreviousTrack.on('pressed', function () {
        self.emit('playPreviousTrackButtonPressed');
    });
    
    btnPlayNextTrack.on('pressed', function () {
        self.emit('playNextTrackButtonPressed');
    });
    
    // Volume control
    btnVolumeDown.on('pressed', function () {
        self.emit('volumeDownButtonPressed');
    });
    
    btnVolumeUp.on('pressed', function () {
        self.emit('volumeUpButtonPressed');
    });
    
    
    
    // Gracefully exit on CTRL+C and errors
    process.on('forceQuitApplication', quitHandler);
    
    
    
    //
    
    
    
    self.enableAppRunningIndicatorLed = function (enable) {
        appRunningIndicatorLed.writeSync(enable == true ? 1 : 0);
    };
    
    self.enablePlayingIndicatorLed = function (enable) {
        playingIndicatorLed.writeSync(enable == true ? 1 : 0);
    };
    
    self.enableAlarmIndicatorLedPulse = function (enable) {
        // Stop the pulsing
        if (enable != true) {
            clearInterval(alarmPulseInterval);
            alarmPulseInterval = null;
            
            return;
        }
        
        // Start pulsing
        alarmPulseInterval = setInterval(function () {
            alarmIndicatorLed.pwmWrite(alarmPulseValue);
            
            alarmPulseValue += alarmPulseIncrement;
            
            // Reverse
            if (alarmPulseValue <= 0 || alarmPulseValue >= 255) {
                alarmPulseIncrement = -alarmPulseIncrement;
            }
        }, 20);
    };
    
    
    
    //
    
    
    
    init();
    
};

//

// Class inherits EventEmitter so we can dispatch and listen to events on the object itself
util.inherits(Controls, EventEmitter);

module.exports = new Controls();
