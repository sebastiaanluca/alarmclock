var debug = require('debug')('SebastiaanLuca:Volume:Volume');

var Loudness = require('loudness');

//

var Volume = function () {
    
    this.getVolume = function () {
        return Loudness.getVolume(function (err, vol) {
            if (err) {
                debug('Error getting volume', err);
                
                return;
            }
            
            return vol;
        })
    };
    
    this.setVolume = function (vol) {
        Loudness.setVolume(vol, function (err) {
            if (err) {
                debug('Error setting volume', err);
                
                return;
            }
            
            debug('Speaker volume set to %s%', vol);
        });
    };
    
};

// Singleton
module.exports = new Volume();