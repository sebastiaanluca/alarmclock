var debug = require('debug')('SebastiaanLuca:AlarmClock:AlarmClock');

var _ = require('lodash');
var moment = require('moment');
var schedule = require('node-schedule');
var loudness = require('loudness');

var Player = require('../../Player/src/Player.js');
var Playlist = require('../../Player/src/Playlist.js');

//

module.exports = function AlarmClock(options) {
    
    var self = this;
    
    var alarmTime = moment(options.at);
    var playDuration = options.playTime;
    var targetVolume = options.volume;
    
    var increaseDuration = options.increaseDuration;
    // Number of times to increase volume per minute
    var increaseSteps = 5;
    var increaseVolume = targetVolume / increaseDuration / increaseSteps;
    
    var playlist;
    var player;
    
    var alarmJob;
    var fixedSnoozeJob;
    
    var currentVolume = 0;
    
    
    
    var init = function () {
        // TODO: move player config out of here and link to alarm clock using events?
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
        // Should shuffle streams, not the backup alarm (so all values in array but the last
        // >> player.shuffle = regular shuffle, alarm clock should handle shuffle without
        // backup alarm
        // Remove backup alarm from playlist, shuffle, add it back, reset player (in that module, not here)
        // >>> Shuffle PLAYLIST, override playlist on PLAYER using player.setPlaylist() + reset player interally so it uses the new PLAYLIST
        //  player.shuffle();
        
        // Keep playing same track
        player.repeat(1);
    };
    
    /*
     * Initialize the alarm schedules
     */
    var initAlarm = function () {
        debug('Setting an alarm for %s:%s', alarmTime.hour(), alarmTime.minute());
        
        // Define amounts of minutes to play track before ending alarm
        var fixedSnoozeTime = moment(alarmTime);
        fixedSnoozeTime.add(playDuration, 'minutes');
        
        debug('Snoozing alarm at %s:%s', fixedSnoozeTime.hour(), fixedSnoozeTime.minute());
        
        alarmJob = schedule.scheduleJob({hour: alarmTime.hour(), minute: alarmTime.minute()}, onAlarmTriggerHandler);
        fixedSnoozeJob = schedule.scheduleJob({hour: fixedSnoozeTime.hour(), minute: fixedSnoozeTime.minute()}, onFixedSnoozeTriggerHandler);
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
            'http://stream.house-radio.com:8000/main.m3u',
            '../resources/audio/alarm1.mp3'
        ];
    };
    
    
    
    /*
     * Alarm job trigger event
     */
    var onAlarmTriggerHandler = function () {
        debug('Alarm triggered!');
        
        // Start from complete silence before we start playing anything
        self.setVolume(0);
        
        // Start playing audio
        player.play();
        
        // TODO: emit event (then turn on an LED or animate them like the KITT LED bar)
        
        // Increase volume every (60 seconds / increase steps) seconds
        schedule.scheduleJob('*/' + (60 / increaseSteps) + ' * * * * *', onIncreaseVolumeTriggerHandler);
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
        
        self.setVolume(currentVolume);
        
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
    
    
    //
    
    
    
    this.getVolume = loudness.getVolume(function (err, vol) {
        return vol;
    });
    
    this.setVolume = function (vol) {
        loudness.setVolume(vol, function (err) {
            debug('Speaker volume set to %s%', vol);
        });
    };
    
    this.getPlayer = function () {
        return player;
    };
    
};