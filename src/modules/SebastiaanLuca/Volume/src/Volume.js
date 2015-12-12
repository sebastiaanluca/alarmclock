var debug = require('debug')('SebastiaanLuca:Volume:Volume');

var Loudness = require('loudness');
var deasync = require('deasync');

//

var Volume = function () {
    
    this.getVolume = function () {
        var volume = deasync(Loudness.getVolume);
        
        return volume();
    };
    
    this.setVolume = function (vol) {
        if (vol < 0) {
            vol = 0;
        } else if (vol > 100) {
            vol = 100;
        }
        
        Loudness.setVolume(vol, function (err) {
            if (err) {
                debug('Error setting volume', err);
                
                return;
            }
            
            debug('System volume set to %s%', vol);
        });
    };
    
    this.decreaseBy = function (num) {
        this.setVolume(this.getVolume() - num);
    };
    
    this.increaseBy = function (num) {
        this.setVolume(this.getVolume() + num);
    };
    
};

// Singleton
module.exports = new Volume();