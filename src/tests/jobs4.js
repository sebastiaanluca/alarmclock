var Moment = require('moment');
var Schedule = require('node-schedule');

var alarmJob;
var fixedSnoozeJob;

var subCounter;

//

// Schedule the jobs
console.log('Setting up jobs');

alarmJob = Schedule.scheduleJob({minute: 10}, function () {
    console.log('[ALARM1] Alarm triggered! It is now %s', Moment().format('MMMM Do YYYY, h:mm:ss a'));
    
    subCounter = 0;
    
    Schedule.scheduleJob('*/1 * * * *', function () {
        console.log('[ALARM 1 - SUB 1] Gradually increasing volume');
        
        if (subCounter >= 10) {
            this.cancel();
            
            return;
        }
        
        ++subCounter;
    });
});

fixedSnoozeJob = Schedule.scheduleJob({minute: 30}, function () {
    console.log('[ALARM2] Force-snoozing alarm. Stopping playback. It is now %s', Moment().format('MMMM Do YYYY, h:mm:ss a'));
});

//

console.log('BOOTED');