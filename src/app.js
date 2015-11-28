var debug = require('debug')('app');

var fs = require('fs');
var request = require('request');

//var lame = require('lame');
var pls = require('playlist-parser').PLS;
var Player = require('player');

//var loudness = require('loudness');
//var Speaker = require('speaker');

//loudness.setVolume(50, function (err) {
//    console.log('Set volume to 50%');
//});

var playlist = 'http://stream.boosh.fm/booshfm_mp3256.pls';

request.get(playlist, function (error, response, body) {
    
    // Error handling
    if (error) {
        debug('Error loading %s (error)', playlist, response.statusCode);
        
        return;
    }
    
    if (response.statusCode != 200) {
        debug('Error loading %s (status code)', playlist, response.statusCode);
        
        return;
    }
    
    // Parse playlist and get streams
    var streams = pls.parse(body);
    var source = streams[0].file;
    
    debug('Found a playable stream: ' + source);
    
    // Play stream
    var player = new Player([source]);
    
    player.enable('stream');
    player.play();
    
    player.on('playing', function (item) {
        debug('Playing %s', item.src);
    });
    
    player.on('playend', function (item) {
        debug('Stopped playing %s', item.src);
        
        debug('Stopping playback');
        player.stop();
    });
    
    player.on('error', function (err) {
        debug('Error playing source', err);
    });
});