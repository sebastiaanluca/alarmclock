var debug = require('debug')('SebastiaanLuca:EventHandlers:PlayerEventHandler');

//

module.exports = function PlayerEventHandler(player, Controls) {
    
    /*
     * Play indicator
     */
    
    player.on('player:play', function () {
        debug('Handling player:play event');
        
        Controls.enablePlayingIndicatorLed(true);
    });
    
    player.on('player:pause', function () {
        debug('Handling player:pause event');
        
        Controls.enablePlayingIndicatorLed(false);
    });
    
};