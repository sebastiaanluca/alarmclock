var debug = require('debug')('SebastiaanLuca:Player:Track');
var request = require('request');
var deasync = require('deasync');
var parser = require('playlist-parser');
var StringHelper = require('../../Helpers/src/StringHelper.js');

//

module.exports = function Track(source) {
    
    var rawSource;
    
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
            // TODO: parse m3u
            var streams = parser.PLS.parse(response.body);
            var source = streams[0].file;
            
            //            debug(streams);
            
            // FIXME: parsed pls produces / url, no playable mp3
            //            // Handle Shoutcast sources
            //            if (source.slice(-1) === '/') {
            //                source = source + 'listen.pls';
            //            }
            
            debug('Found a playable stream: ' + source);
            
            return source;
        } catch (error) {
            debug('Error loading %s (error)', stream, error);
        }
    };
    
    //
    
    this.getSource = function () {
        return source;
    };
    
    this.getRawSource = function () {
        // Cache result
        if (rawSource) {
            return rawSource;
        }
        
        var extension = StringHelper.getFileExtension(source);
        
        debug('Track source extension is %s', extension);
        
        switch (extension) {
            case 'mp3':
                rawSource = source;
                break;
            
            case 'pls':
                rawSource = getSourceFromStream(source);
                break;
            
            default:
                debug('Undefined source type');
        }
        
        return rawSource;
    }
    
    
    
};