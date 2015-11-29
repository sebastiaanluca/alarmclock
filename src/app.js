var debug = require('debug')('alarmclock:app');

var Player = require('./modules/SebastiaanLuca/Player/src/Player.js');
var Playlist = require('./modules/SebastiaanLuca/Player/src/Playlist.js');
var Track = require('./modules/SebastiaanLuca/Player/src/Track.js');

//
var sources = [
    'http://stream.boosh.fm/booshfm_mp3256.pls'
];

// Speaker volume
//var loudness = require('loudness');
//var Speaker = require('speaker');

//loudness.setVolume(50, function (err) {
//    console.log('Set volume to 50%');
//});

//
var playlist = new Playlist(sources);
var player = new Player(playlist);

player.play();