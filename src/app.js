console.log('Booting application');

//

var debug = require('debug')('alarmclock:app');

require('modules/SebastiaanLuca/Helpers/src/ProcessHelper.js');
require('modules/SebastiaanLuca/Helpers/src/KeepAwake.js');

var Volume = require('modules/SebastiaanLuca/Volume/src/Volume.js');
var Player = require('modules/SebastiaanLuca/Player/src/MpdPlayer.js');
var Playlist = require('modules/SebastiaanLuca/Player/src/Playlist.js');

var AlarmClock = require('modules/SebastiaanLuca/AlarmClock/src/AlarmClock.js');
var Controls = require('modules/SebastiaanLuca/Controls/src/Controls.js');

// Use event handlers to link events of certain modules to their counterparts
var ControlsEventHandler = require('EventHandlers/ControlsEventHandler.js');
var PlayerEventHandler = require('EventHandlers/PlayerEventHandler.js');
var AlarmEventHandler = require('EventHandlers/AlarmEventHandler.js');

//

var DEFAULT_VOLUME = 78;

//

/*
 * Volume
 */

// Set default system volume
Volume.setVolume(DEFAULT_VOLUME);



/*
 * Player
 */

// TODO: move to config file
// See https://github.com/motdotla/dotenv + https://github.com/harishanchu/nodejs-config
// TODO: add button to reset (player playlist and reload+readd streams from config file (should it have changed))
var tracks = [
    'http://mp3.streampower.be/stubru-high.mp3',
    //    'http://mp3.streampower.be/mnm-high.mp3',
    //    'http://mp3.streampower.be/klara-high.mp3',
    'http://www.plusfm.net/plusfm.m3u',
    'http://stream.boosh.fm:8000/booshfm_128.mp3',
    'http://stream.house-radio.com:8000/main.m3u',
    'http://1.fm/TuneIn/dubstep128k.pls',
    'http://uk1.internet-radio.com:15634/listen.pls',
    'http://www.radiofeeds.co.uk/bbc1xtra.pls',
    'http://178.20.171.32:8058/',
    'http://nsbradio.co.uk/listen128k.pls',
    
    // Local backup audio file as backup alarm
    // See ~/Music/
    'cuckoo.mp3'
];

// Create a playlist
playlist = new Playlist(tracks);

// Create a player using our playlist
player = new Player(playlist);

// Set some player options
player.repeat(true);



/*
 * Alarm
 */

// Create an alarm clock using our player
var alarm = new AlarmClock({
    // Run every day at
    at: {hour: 8, minute: 0},
    
    // Auto-snooze after x minutes
    playTime: 5 * 60,
    
    // Set speaker target volume
    volume: DEFAULT_VOLUME,
    
    // Duration to increase volume to target level (in minutes)
    increaseDuration: 8
}, player);



/*
 * Event handling
 */
new ControlsEventHandler(Controls, player);
new PlayerEventHandler(player, Controls);
new AlarmEventHandler(alarm, Controls);

//

console.log('Application ready!');

Controls.enableAppRunningIndicatorLed(true);