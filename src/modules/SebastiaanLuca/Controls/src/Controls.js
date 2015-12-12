var debug = require('debug')('SebastiaanLuca:Controls:Controls');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

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
    var appRunningIndicatorLed = new Led(25);
    var playingIndicatorLed = new Led(9);
    var alarmIndicatorLed = new Led(11);
    
    
    
    var init = function () {
        //
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
    
    
    
    //
    
    
    
    self.enableAppRunningIndicatorLed = function (enable) {
        appRunningIndicatorLed.enable(enable);
    };
    
    self.enablePlayingIndicatorLed = function (enable) {
        playingIndicatorLed.enable(enable);
    };
    
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
