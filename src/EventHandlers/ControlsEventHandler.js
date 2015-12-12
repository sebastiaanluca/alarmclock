var debug = require('debug')('SebastiaanLuca:EventHandlers:ControlsEventHandler');

var Volume = require('modules/SebastiaanLuca/Volume/src/Volume.js');

//

module.exports = function ControlsEventHandler(Controls, player) {
    
    /*
     * Player control
     */
    
    Controls.on('playPauseButtonPressed', function () {
        debug('Handling playPauseButtonPressed event');
        
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
    
    Controls.on('playPreviousTrackButtonPressed', function () {
        debug('Handling playPreviousTrackButtonPressed event');
        
        player.previous();
    });
    
    Controls.on('playNextTrackButtonPressed', function () {
        debug('Handling playNextTrackButtonPressed event');
        
        player.next();
    });
    
    /*
     * Volume control 
     */
    
    Controls.on('volumeDownButtonPressed', function () {
        debug('Handling volumeDownButtonPressed event');
        
        Volume.decreaseBy(5);
    });
    
    Controls.on('volumeUpButtonPressed', function () {
        debug('Handling volumeUpButtonPressed event');
        
        Volume.increaseBy(5);
    });
    
    
};