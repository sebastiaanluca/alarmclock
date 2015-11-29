var debug = require('debug')('SebastiaanLuca:Player:Track');
var request = require('request');
var deasync = require('deasync');
var parser = require('playlist-parser').PLS;

module.exports = function Track(source) {
    
    var getSourceFromStream = function (stream) {
        // De-synchronize request
        // @ https://github.com/abbr/deasync
        var req = deasync(request.get);
        
        try {
            // Get playlist
            var response = req(stream);
            
            // Error handling
            if (response.statusCode != 200) {
                debug('Error loading %s (status code)', stream, response.statusCode);
                
                return;
            }
            
            debug('Reading streams from audio playlist...');
            
            // Parse playlist and get streams
            var streams = parser.parse(response.body);
            var source = streams[0].file;
            
            debug('Found a playable stream: ' + source);
            
            return source;
        } catch (error) {
            debug('Error loading %s (error)', stream, error);
        }
    };
    
    //
    
    this.getSource = function () {
        // TODO: if source ends in .pls, parse and get mp3 source (new method, switch case on extension)
        return getSourceFromStream(source);
    }
    
};