var debug = require('debug')('Tests:Jobs');

var Moment = require('moment');
var Schedule = require('node-schedule');

var alarmTime = Moment({seconds: 20});

var alarmJob;
var fixedSnoozeJob;

//

var fixedSnoozeTime = Moment(alarmTime);
fixedSnoozeTime.add(10, 'seconds');

alarmJob = Schedule.scheduleJob({minute: null, second: [0, 20, 40]}, function () {
    debug('Alarm triggered! It is now %s', Moment().format('MMMM Do YYYY, h:mm:ss a'));
});

fixedSnoozeJob = Schedule.scheduleJob({minute: null, second: [10, 30, 50]}, function () {
    debug('Force-snoozing alarm. Stopping playback. It is now %s', Moment().format('MMMM Do YYYY, h:mm:ss a'));
});

//

console.log('BOOTED');