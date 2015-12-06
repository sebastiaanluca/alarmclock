var debug = require('debug')('Tests:Jobs');

var Moment = require('moment');
var Schedule = require('node-schedule');

//

Schedule.scheduleJob('first', { second: new Schedule.Range(0, 59) }, function() { console.log('1 running.');});
Schedule.scheduleJob('second', { second: new Schedule.Range(0, 59) }, function() { console.log('2 running.');});
Schedule.scheduleJob('third', { second: new Schedule.Range(0, 59) }, function() { console.log('3 running.');});

//

console.log('BOOTED');