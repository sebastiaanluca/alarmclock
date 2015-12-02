console.log('Application ready');

//

var debug = require('debug')('alarmclock:app');

var AlarmClock = require('./modules/SebastiaanLuca/AlarmClock/src/AlarmClock.js');
var Controls = require('./modules/SebastiaanLuca/Controls/src/Controls.js');

//

var alarm = new AlarmClock({
    // Run every day at
    at: {hour: 7, minute: 50},
    
    // Auto-snooze after x minutes
    playTime: 90,
    
    // Set speaker target volume
    volume: 50,
    
    // Duration to increase volume to target level (in minutes)
    increaseDuration: 10
});

// Use in Control event handler to control player based in physical user input
var player = alarm.getPlayer();



// TODO: move to event handler (not part of any module!)
Controls.on('playPauseButtonPressed', function () {
    debug('Handling playPauseButtonPressed event');
    
    if (player.isPlaying()) {
        debug('PAUSE');
        player.pause();
        
        return;
    }
    
    debug('PLAY');
    player.play();
});

//

// TODO: move to separate module
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