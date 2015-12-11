var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 0;

var j = schedule.scheduleJob(rule, function(){
    console.log('[ALARM1] Alarm triggered! It is now %s', (new Date()));
});