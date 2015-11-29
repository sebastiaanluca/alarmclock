var debug = require('debug')('SebastiaanLuca:Player:Playlist');
var Track = require('./Track.js');

//
module.exports = function Playlist(sources) {
    
    // Parse strings to tracks
    var parse = function (sources) {
        for (var i = 0; i < sources.length; ++i) {
            var source = sources[i];
            
            if (typeof source === 'string') {
                sources[i] = new Track(source);
            }
        }
        
        return sources;
    };
    
    this.tracks = parse(sources);
    
    //
    
    this.getTrackAt = function (index) {
        return this.tracks[index];
    }
    
};