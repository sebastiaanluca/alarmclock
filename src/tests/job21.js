console.log('[Job21] Running a node-schedule job every hour with an interval wake script', new Date());

var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 0;

var j = schedule.scheduleJob(rule, function () {
    console.log('[Job21] Alarm triggered! It is now %s', (new Date()));
});

setInterval(function () {
    console.log('[Job21] Interval wake trigger! It is now %s', (new Date()));
}, 1000 * 60 * 20);