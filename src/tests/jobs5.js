var Moment = require('moment');
var Schedule = require('node-schedule');

var subCounter;

//

// Schedule the jobs
console.log('Setting up jobs');

var alarmRule = new Schedule.RecurrenceRule();
alarmRule.hour = null;
alarmRule.minute = 10;
alarmRule.second = 0;

var snoozeRule = new Schedule.RecurrenceRule();
snoozeRule.hour = null;
snoozeRule.minute = 20;
snoozeRule.second = 0;

Schedule.scheduleJob(alarmRule, function () {
    console.log('[ALARM1] Alarm triggered! It is now %s', Moment().format('MMMM Do YYYY, h:mm:ss a'));
    
    subCounter = 0;
    
    Schedule.scheduleJob('*/1 * * * *', function () {
        console.log('[ALARM 1 - SUB 1] It is now %s', Moment().format('MMMM Do YYYY, h:mm:ss a'));
        
        if (subCounter >= 5) {
            this.cancel();
            
            return;
        }
        
        ++subCounter;
    });
});

Schedule.scheduleJob(snoozeRule, function () {
    console.log('[ALARM2] Force-snoozing alarm. Stopping playback. It is now %s', Moment().format('MMMM Do YYYY, h:mm:ss a'));
});

//

console.log('BOOTED');