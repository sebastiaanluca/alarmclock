var debug = require('debug')('SebastiaanLuca:EventHandlers:ControlsEventHandler');

//

module.exports = function ControlsEventHandler(Controls, player) {
    
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
    
    Controls.on('playPreviousTrackButtonPressed', function () {
        debug('Handling playPreviousTrackButtonPressed event');
        
        player.previous();
    });
    
    Controls.on('playNextTrackButtonPressed', function () {
        debug('Handling playNextTrackButtonPressed event');
        
        player.next();
    });
    
    
};