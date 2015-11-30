var debug = require('debug')('alarmclock:app');
var AlarmClock = require('./modules/SebastiaanLuca/AlarmClock/src/AlarmClock.js');

//

new AlarmClock({
    // Run every day at
    at: {hour: 7, minute: 50},
    
    // Auto-snooze after x minutes
    playTime: 120,
    
    // Set speaker target volume
    volume: 50,
    
    // Duration to increase volume to target level (in minutes)
    increaseDuration: 10
});