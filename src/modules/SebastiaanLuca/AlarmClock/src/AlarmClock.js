var debug = require('debug')('SebastiaanLuca:AlarmClock:AlarmClock');

var _ = require('lodash');
var schedule = require('node-schedule');
var loudness = require('loudness');

var Player = require('../../Player/src/Player.js');
var Playlist = require('../../Player/src/Playlist.js');

//

module.exports = function AlarmClock(options) {
    
    var alarmTime = options.at;
    var playTime = options.playTime;
    var volume = options.volume;
    
    var playlist;
    var player;
    
    var alarmJob;
    var fixedSnoozeJob;
    
    
    
    var init = function () {
        initPlayer();
        initAlarm();
    };
    
    
    
    /*
     * Initialize the audio player
     */
    var initPlayer = function () {
        playlist = new Playlist(getSources());
        player = new Player(playlist);
        
        // TODO: shuffle should be a config option? (config being a readable/writable config file here)
        // Should shuffle streams, not the backup alarm
        //  player.shuffle();
        
        // Keep playing same track
        player.repeat(1);
    };
    
    /*
     * Initialize the alarm schedules
     */
    var initAlarm = function () {
        debug('Setting an alarm for %s:%s', alarmTime.hour, alarmTime.minute);
        
        // Define amounts of minutes to play track before ending alarm
        var fixedSnoozeTime = _.clone(alarmTime);
        fixedSnoozeTime.minute += playTime;
        
        debug('Derrrrrr %s:%s', fixedSnoozeTime.hour, fixedSnoozeTime.minute);
        
        schedule.scheduleJob(alarmTime, onAlarmTriggerHandler);
        schedule.scheduleJob(fixedSnoozeTime, onFixedSnoozeTriggerHandler);
    };
    
    
    
    /*
     * Return the audio sources for the audio player
     */
    var getSources = function () {
        // TODO: move to config file
        return [
            //    'http://nsbradio.co.uk/listen128k.pls',
            //    'http://uk1.internet-radio.com:15634/listen.pls',
            //    'http://1.fm/TuneIn/dubstep128k.pls',
            //    'http://www.plusfm.net/plusfm.m3u',
            'http://stream.boosh.fm/booshfm_mp3256.pls',
            //    'http://stream.house-radio.com:8000/main.m3u',
            '../resources/audio/alarm1.mp3'
        ];
    };
    
    
    
    /*
     * Reset speaker volume
     */
    var resetVolume = function () {
        debug('Setting speaker volume to %s%', volume);
        
        loudness.setVolume(volume, function () {
            //
        });
    };
    
    
    
    /*
     * Alarm job trigger event
     */
    var onAlarmTriggerHandler = function () {
        debug('Alarm triggered!');
        
        // Make sure we can hear something
        resetVolume();
        
        // Start playing audio
        player.play();
    };
    
    /*
     * Alarm snooze job trigger event
     */
    var onFixedSnoozeTriggerHandler = function () {
        debug('Force-snoozing alarm. Stopping playback.');
        
        // Stop audio playback
        player.stop();
    };
    
    
    
    init();
    
};