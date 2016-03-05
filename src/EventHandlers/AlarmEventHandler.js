var debug = require('debug')('SebastiaanLuca:EventHandlers:AlarmEventHandler');

//

module.exports = function AlarmEventHandler(alarm, Controls) {
    
    alarm.on('alarm:alarm', function () {
        debug('Handling alarm:alarm event');
        
        Controls.enableAlarmIndicatorLedPulse(true);
    });
    
    alarm.on('alarm:snooze', function () {
        debug('Handling alarm:snooze event');
        
        Controls.enableAlarmIndicatorLedPulse(false);
    });
    
};