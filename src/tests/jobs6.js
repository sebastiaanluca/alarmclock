var Moment = require('moment');
var Schedule = require('node-schedule');

//

// Schedule the jobs
console.log('Setting up jobs');

var alarmRule = new Schedule.RecurrenceRule();
alarmRule.hour = null;
alarmRule.minute = 20;
alarmRule.second = 0;

Schedule.scheduleJob(alarmRule, function () {
    console.log('[ALARM1] Alarm triggered! It is now %s', Moment().format('MMMM Do YYYY, h:mm:ss a'));
});

//

console.log('BOOTED');