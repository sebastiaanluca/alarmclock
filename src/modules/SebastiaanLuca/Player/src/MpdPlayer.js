var debug = require('debug')('SebastiaanLuca:Player:MpdPlayer');
var Komponist = require('komponist');

//

module.exports = function Player(playlist) {
    
    var isPlaying = false;
    var repeat = true;
    
    var player;
    
    // TODO: update these on play start/stop/etc
    //    var currentPlaylistTrack = 0;
    //    var currentTrack = null;
    
    
    
    function init() {
        player = Komponist.createConnection(6600, 'localhost');
        
        // Clear the current playlist
        // TODO: tie to a physical "reset" button that clears the current MPD playlist and uses the app's
        player.clear();
        
        // Add tracks
        for (var i = 0; i < playlist.tracks.length; ++i) {
            var track = playlist.getTrackAt(i);
            var source = track.getRawSource();
            
            // No source found
            if (source == undefined) {
                debug('Skipping track %s', track.getSource());
                continue;
            }
            
            debug('Adding track source %s to player', source);
            
            player.add(source, function (err) {
                if (err) {
                    debug('Add track error!', source, err);
                }
            });
        }
    }
    
    
    
    process.on('forceQuitApplication', function () {
        if (player) {
            // TODO: not sure if we should stop playing here, maybe another client initiated playback?
            player.stop();
        }
    });
    
    
    
    init();
    
    
    
    //
    
    
    
    this.isPlaying = function () {
        // FIXME: get it from the MPC player directly
        player.status(function (a) {
            debug('>>>>', a);
        });
        
        return isPlaying;
    };
    
    
    
    this.play = function () {
        debug('Starting playlist playback');
        
        // TODO: emit play:load and play:start event (or listen to client status events) + update LED on buffering etc (blinking)
        player.play(function (err) {
            if (err) {
                debug('Error on playback', err);
                
                return;
            }
            
            debug('Playback started!');
        });
        
        isPlaying = true;
    };
    
    this.pause = function () {
        player.stop();
        isPlaying = false;
    };
    
    this.stop = function () {
        player.stop();
    };
    
    this.next = function () {
        player.next();
    };
    
    this.previous = function () {
        player.previous();
    };
    
    this.shuffle = function () {
        player.shuffle();
    };
    
    this.repeat = function (r) {
        repeat = r;
        player.repeat(repeat === true ? 1 : 0);
    };
    
};