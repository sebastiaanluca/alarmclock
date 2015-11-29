var debug = require('debug')('SebastiaanLuca:Player:Player');
var AudioPlayer = require('player');

module.exports = function Player(playlist) {
    
    // TODO: update these on play start/stop/etc
    //    var currentPlaylistTrack = 0;
    //    var currentTrack = null;
    
    var player = new AudioPlayer();
    
    function init() {
        player.enable('stream');
        
        for (var i = 0; i < playlist.tracks.length; ++i) {
            var track = playlist.getTrackAt(i);
            var source = track.getSource();
            
            // No source found
            // TODO: should log this somewhere or notify user
            if (source == undefined) {
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
        debug('Playing %s', item.src);
    });
    
    player.on('playend', function (item) {
        debug('Stopped playing %s', item.src);
        
        debug('Stopping playlist playback');
        player.stop();
    });
    
    player.on('error', function (err) {
        debug('Error playing source', err);
    });
    
    init();
    
    //
    
    this.play = function () {
        debug('Starting playlist playback');
        
        if (player.list.length === 0) {
            debug('No tracks added to player');
            
            return;
        }
        
        player.play();
    };
    
};