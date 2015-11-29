var debug = require('debug')('SebastiaanLuca:Player:Player');
var AudioPlayer = require('player');

//

module.exports = function Player(playlist) {
    
    var repeat = true;
    
    var player = new AudioPlayer();
    
    // TODO: update these on play start/stop/etc
    var currentPlaylistTrack = 0;
    //    var currentTrack = null;
    
    function init() {
        player.enable('stream');
        
        for (var i = 0; i < playlist.tracks.length; ++i) {
            var track = playlist.getTrackAt(i);
            var source = track.getRawSource();
            
            // No source found
            if (source == undefined) {
                debug('Skipping track %s', track.getSource());
                continue;
            }
            
            debug('Adding track source %s to player', source);
            
            player.add(source);
        }
    }
    
    /*
     * Player events
     */
    
    player.on('playing', function (item) {
        debug('Playing track %s (%s)', currentPlaylistTrack, item.src);
    });
    
    player.on('playend', function (item) {
        debug('Stopped playing %s', item.src);
        
        debug('Playing next track');
        //  ++currentPlaylistTrack;
        // TODO: if current track > playlist.tracks.length; current = 0
        // TODO: if current track + 1 === playlist.tracks.length && repeat = true, start from beginning again
        // TODO: if ^ && repeat = 1; repeat same again (player.play()?)
        // TODO: if ^ && repeat = false; do nothing
        
        // Repeat track
        if (repeat === 1) {
            player.play();
            
            return;
        }
        
        player.next();
    });
    
    player.on('error', function (err) {
        debug('Error playing source. Playing next track.', err);
        
        player.next();
    });
    
    init();
    
    
    
    //
    
    
    
    this.isPlaying = function () {
        return !player.paused;
    };
    
    
    
    this.play = function () {
        debug('Starting playlist playback');
        
        if (player.list.length === 0) {
            debug('No tracks to play!');
            
            return;
        }
        
        debug('Player playlist:', player.list);
        
        player.play();
    };
    
    this.stop = function () {
        player.stop();
    };
    
    this.shuffle = function () {
        playlist.shuffle(); // FIXME: just shuffles the playlist, but the player is using its own (recreate player with shuffled playlist)
    };
    
    this.repeat = function (r) {
        repeat = r;
    };
    
};