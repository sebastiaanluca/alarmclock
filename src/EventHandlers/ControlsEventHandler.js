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
    
    
};