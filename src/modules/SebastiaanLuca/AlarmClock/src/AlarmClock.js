var debug = require('debug')('SebastiaanLuca:AlarmClock:AlarmClock');

var _ = require('lodash');
var Moment = require('moment');
var Schedule = require('node-schedule');
var Volume = require('modules/SebastiaanLuca/Volume/src/Volume.js');

//

module.exports = function AlarmClock(options, player) {
    
    var alarmTime = Moment(options.at);
    var playDuration = options.playTime;
    var targetVolume = options.volume;
    
    var increaseDuration = options.increaseDuration;
    // Number of times to increase volume per minute
    var increaseSteps = 5;
    var increaseVolume = targetVolume / increaseDuration / increaseSteps;
    var currentVolume = 0;
    
    var alarmJob;
    var fixedSnoozeJob;
    
    
    
    var init = function () {
        initAlarm();
    };
    
    
    
    /*
     * Initialize the alarm schedules
     */
    var initAlarm = function () {
        debug('Setting an alarm for %s:%s', alarmTime.hour(), alarmTime.minute());
        
        // Define amounts of minutes to play track before ending alarm
        var fixedSnoozeTime = Moment(alarmTime);
        fixedSnoozeTime.add(playDuration, 'minutes');
        
        debug('Snoozing alarm at %s:%s', fixedSnoozeTime.hour(), fixedSnoozeTime.minute());
        
        alarmJob = Schedule.scheduleJob({hour: alarmTime.hour(), minute: alarmTime.minute()}, onAlarmTriggerHandler);
        fixedSnoozeJob = Schedule.scheduleJob({hour: fixedSnoozeTime.hour(), minute: fixedSnoozeTime.minute()}, onFixedSnoozeTriggerHandler);
    };
    
    
    
    /*
     * Alarm job trigger event
     */
    var onAlarmTriggerHandler = function () {
        debug('Alarm triggered! It is now %s', moment().format('MMMM Do YYYY, h:mm:ss a'));
        
        // Start from complete silence before we start playing anything
        Volume.setVolume(0);
        
        // Start playing audio
        player.play();
        
        // TODO: emit event (then turn on an LED or animate them like the KITT LED bar)
        
        // Increase volume every (60 seconds / increase steps) seconds
        Schedule.scheduleJob('*/' + (60 / increaseSteps) + ' * * * * *', onIncreaseVolumeTriggerHandler);
    };
    
    /*
     * Alarm snooze job trigger event
     */
    var onFixedSnoozeTriggerHandler = function () {
        debug('Force-snoozing alarm. Stopping playback.');
        
        // Stop audio playback
        player.stop();
    };
    
    var onIncreaseVolumeTriggerHandler = function () {
        debug('Gradually increasing volume by %s%', increaseVolume);
        
        Volume.setVolume(Math.round(currentVolume));
        
        // Reached target volume
        if (currentVolume >= targetVolume) {
            debug('Reached target volume %s, cancelling volume increase job', targetVolume);
            
            // Cancel volume job
            this.cancel();
        }
        
        // Volume job runs immediately, so we need to time it right
        // (set to 0 on first run and end at target volume on the minute)
        currentVolume += increaseVolume;
    };
    
    
    
    init();
    
};