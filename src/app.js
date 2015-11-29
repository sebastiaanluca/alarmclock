var debug = require('debug')('alarmclock:app');
var AlarmClock = require('./modules/SebastiaanLuca/AlarmClock/src/AlarmClock.js');

//

var alarm = new AlarmClock({
    // Run every day at
    //    at: {hour: 7, minute: 50},
    at: {hour: 22, minute: 3},
    
    // Auto-snooze after x minutes
    playTime: 120,
    
    // Set speaker volume
    volume: 20
});