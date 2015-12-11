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
    var increaseSteps = 6;
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
        debug('Alarm triggered! It is now %s', new Date());
        
        // Start from complete silence before we start playing anything
        resetVolume();
        
        // Start playing audio
        player.play();
        
        // TODO: emit event (then pulse LED until alarm snooze event is triggered OR the MPC status changed to paused/stop)
        
        // Increase volume every (60 seconds / increase steps) seconds
        Schedule.scheduleJob('*/' + (60 / increaseSteps) + ' * * * * *', onIncreaseVolumeTriggerHandler);
    };
    
    /*
     * Alarm snooze job trigger event
     */
    var onFixedSnoozeTriggerHandler = function () {
        debug('Force-snoozing alarm. Stopping playback. It is now %s', new Date());
        
        // Stop audio playback
        player.stop();
    };
    
    var onIncreaseVolumeTriggerHandler = function () {
        debug('Gradually increasing volume by %s% (now at %s)', increaseVolume, currentVolume);
        
        Volume.setVolume(currentVolume);
        
        // Reached target volume
        if (currentVolume >= targetVolume) {
            debug('Reached target volume %s, cancelling volume increase job', targetVolume);
            
            // Cancel volume job
            this.cancel();
            
            currentVolume = targetVolume;
            
            return;
        }
        
        // Volume job runs immediately, so we need to time it right
        // (set to 0 on first run and end at target volume on the minute)
        currentVolume += increaseVolume;
        currentVolume = Math.round(currentVolume);
    };
    
    
    
    var resetVolume = function () {
        // Set current volume to inbetween alarms
        currentVolume = 0;
        
        // Set system volume
        Volume.setVolume(currentVolume);
    };
    
    
    
    init();
    
};