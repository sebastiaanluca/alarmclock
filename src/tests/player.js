console.log('Application ready!');

var appRoot = require('app-root-path');

var audio = [
    //    appRoot + '/resources/audio/alarm1.mp3',
    'http://stream.boosh.fm:8000/booshfm_256.mp3',
    'http://stream.house-radio.com:8000/main'
];
//
////var Player = require('player');
////var player = new Player(audio);
////
////player.play();
//
//// Play-sound requires an external program like MPlayer
//var player = require('play-sound')(opts = {});
//
//var track = appRoot + '/resources/audio/alarm1.mp3';
//var track = 'http://stream.boosh.fm:8000/booshfm_256.mp3';
//
//player.play(track, function (err) {
//    console.log('ERROR', err);
//});

var komponist = require('komponist');

var client = komponist.createConnection(6600, 'localhost', function () {
    
    // Clear the current playlist
    client.clear();
    
    // Set volume
    client.setvol(90);
    
    // Repeat playlist
    client.repeat(1);
    
    // Randomize 
    client.random(1);
    
    // Add a new track
    audio.forEach(function (track) {
        console.log('Adding ', track);
        
        client.add(track, function (err) {
            console.log('Add track error?', err);
        });
    });
    
    client.play(function (err) {
        console.log('error?', err);
        
        //            client.currentsong(function (err, info) {
        //                console.log(info.Artist); // Ennio Morricone
        //                console.log(info.Title);  // Il Buono, Il Cattivo, Il Brutto
        //                console.log(info.Album);  // The Good, The Bad, And The Ugly
        //            });
    });
    
});

process.on('forceQuitApplication', function () {
    if (client) {
        client.stop();
        //        client.close();
    }
});



var quit = function () {
    console.log('Exiting application.');
    
    process.emit('forceQuitApplication');
    
    // Give the rest of the application some time to handle their affairs
    setTimeout(function () {
        console.log('QUITTING - FINAL NOTICE');
        // Gracefully quit application
        process.exit();
    }, 1000)
};

process.on('SIGINT', quit);
//process.on('uncaughtException', quit);