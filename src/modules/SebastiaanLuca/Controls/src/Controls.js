var debug = require('debug')('SebastiaanLuca:Controls:Controls');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Gpio = require('onoff').Gpio;

var Button = require('modules/SebastiaanLuca/Controls/src/Peripherals/Button.js');
var Led = require('modules/SebastiaanLuca/Controls/src/Peripherals/Led.js');

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
    var alarmIndicatorLed = new Led(11);
    
    
    
    var init = function () {
        //
        alarmIndicatorLed.pulse(true); // REMOVE
    };
    
    var quitHandler = function () {
        debug('Cleaning up our mess.');
        
        // Clear perhipherals
        appRunningIndicatorLed.unexport();
        playingIndicatorLed.unexport();
    };
    
    
    
    // Play/pause
    btnPlayPause.on('pressed', function () {
        self.emit('controls:playPauseButtonPressed');
    });
    
    // Previous/next
    btnPlayPreviousTrack.on('pressed', function () {
        self.emit('controls:playPreviousTrackButtonPressed');
    });
    
    btnPlayNextTrack.on('pressed', function () {
        self.emit('controls:playNextTrackButtonPressed');
    });
    
    // Volume control
    btnVolumeDown.on('pressed', function () {
        self.emit('controls:volumeDownButtonPressed');
    });
    
    btnVolumeUp.on('pressed', function () {
        self.emit('controls:volumeUpButtonPressed');
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
    
    // TODO: move pulse code to LED class (LED = enable/disable/pulse/stop pulse)
    self.enableAlarmIndicatorLedPulse = function (enable) {
        alarmIndicatorLed.pulse(enable);
    };
    
    
    
    //
    
    
    
    init();
    
};

//

// Class inherits EventEmitter so we can dispatch and listen to events on the object itself
util.inherits(Controls, EventEmitter);

module.exports = new Controls();
