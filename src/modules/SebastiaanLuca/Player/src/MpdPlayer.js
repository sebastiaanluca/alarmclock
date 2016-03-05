var debug = require('debug')('SebastiaanLuca:Player:MpdPlayer');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Komponist = require('komponist');
var deasync = require('deasync');

//

var Player = function Player(playlist) {
    
    var self = this;
    
    var player;
    
    
    
    function init() {
        player = Komponist.createConnection(6600, 'localhost');
        
        // Clear the current playlist
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
    
    
    
    init();
    
    
    
    player.on('changed', function (type) {
        //  debug('External event for: ' + type);
        
        if (type === 'player') {
            if (self.isPlaying()) {
                self.emit('player:play');
            } else {
                self.emit('player:pause');
            }
        }
    });
    
    
    
    process.on('forceQuitApplication', function () {
        //    if (player) {
        //        // TODO: not sure if we should stop playing here, maybe another client initiated playback?
        //        player.stop();
        //    }
    });
    
    
    
    //
    
    
    
    self.getStatus = function () {
        var done = false;
        var status;
        
        player.status(function (error, result) {
            status = result;
            done = true;
        });
        
        deasync.loopWhile(function () {
            return !done;
        });
        
        return status;
    };
    
    self.isPlaying = function () {
        var status = self.getStatus();
        
        return status.state !== 'stop' && status.state !== 'pause';
    };
    
    
    
    self.play = function () {
        debug('Starting playlist playback');
        
        player.play(function (err) {
            if (err) {
                debug('Error on playback', err);
                
                return;
            }
            
            debug('Playback started!');
        });
    };
    
    self.pause = function () {
        player.stop();
    };
    
    self.stop = function () {
        player.stop();
    };
    
    self.next = function () {
        player.next();
    };
    
    self.previous = function () {
        player.previous();
    };
    
    self.shuffle = function () {
        player.shuffle();
    };
    
    self.repeat = function (r) {
        repeat = r;
        player.repeat(repeat === true ? 1 : 0);
    };
    
};

//

util.inherits(Player, EventEmitter);

module.exports = Player;