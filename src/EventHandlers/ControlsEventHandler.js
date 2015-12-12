var debug = require('debug')('SebastiaanLuca:EventHandlers:ControlsEventHandler');

var Volume = require('modules/SebastiaanLuca/Volume/src/Volume.js');

//

module.exports = function ControlsEventHandler(Controls, player) {
    
    /*
     * Player control
     */
    
    Controls.on('controls:playPauseButtonPressed', function () {
        debug('Handling controls:playPauseButtonPressed event');
        
        if (player.isPlaying()) {
            debug('PAUSE/STOP');
            player.pause();
            
            return;
        }
        
        debug('PLAY');
        player.play();
    });
    
    /*
     * Track control
     */
    
    Controls.on('controls:playPreviousTrackButtonPressed', function () {
        debug('Handling controls:playPreviousTrackButtonPressed event');
        
        player.previous();
    });
    
    Controls.on('controls:playNextTrackButtonPressed', function () {
        debug('Handling controls:playNextTrackButtonPressed event');
        
        player.next();
    });
    
    /*
     * Volume control 
     */
    
    Controls.on('controls:volumeDownButtonPressed', function () {
        debug('Handling controls:volumeDownButtonPressed event');
        
        Volume.decreaseBy(5);
    });
    
    Controls.on('controls:volumeUpButtonPressed', function () {
        debug('Handling controls:volumeUpButtonPressed event');
        
        Volume.increaseBy(5);
    });
    
    
};