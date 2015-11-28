var debug = require('debug');

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
//
//fs.createReadStream('resources/audio/audio.mp3')
//.pipe(new lame.Decoder())
//.on('format', function (format) {
//    console.log('Playing audio file');
//    
//    this.pipe(new Speaker(format));
//});

var playlist = 'http://stream.boosh.fm/booshfm_mp3256.pls';

request.get(playlist, function (error, response, body) {
    
    // Error handling
    if (error) {
        console.log(error);
        
        return;
    }
    
    if (response.statusCode != 200) {
        console.log(response.statusCode);
        
        return;
    }
    
    // Parse playlist and get streams
    var streams = pls.parse(body);
    var source = streams[0].file;
    
    console.log('Found a playable stream: ' + source);
    
    // Play stream
    var player = new Player([source]);
    
    player.enable('stream');
    player.play();
    
    player.on('playing',function(item){
        console.log('im playing... src:' + item);
    });
    
    // event: on playend 
    player.on('playend',function(item){
        // return a playend item 
        console.log('src:' + item + ' play done, switching to next one ...');
    });
    
    player.on('error', function (err) {
        console.log('PLAYER ERROR', err);
    });
    
//    new Player('http://stream.srg-ssr.ch/m/rsp/mp3_128')
//    .enable('stream')
//    .on('playing', function(song) {
//        debug('Playing... ');
//        debug(song);
//    })
//    .on('error', function(err) {
//        debug('Opps...!');
//        debug(err);
//    })
//    .play()
});