var debug = require('debug')('SebastiaanLuca:Player:Track');
var request = require('request');
var deasync = require('deasync');
var parser = require('playlist-parser');
var StringHelper = require('../../Helpers/src/StringHelper.js');

//

module.exports = function Track(source) {
    
    var rawSource;
    
    
    
    var getSourceFromPls = function (stream) {
        return getSourceFromStream(stream, 'pls');
    };
    
    var getSourceFromM3u = function (stream) {
        return getSourceFromStream(stream, 'm3u');
    };
    
    var getSourceFromStream = function (stream, type) {
        // De-synchronize request
        // @ https://github.com/abbr/deasync
        var req = deasync(request.get);
        
        try {
            // Get playlist
            //  var response = req(stream);
            var response = req({
                uri: stream,
                timeout: 5000
            });
            
            // Error handling
            if (response.statusCode != 200) {
                debug('Error loading %s (status code)', stream, response.statusCode);
                
                return;
            }
            
            debug('Reading streams from audio playlist...');
            
            // Parse playlist and get streams
            var streams;
            
            switch (type) {
                case 'pls':
                    streams = parser.PLS.parse(response.body);
                    break;
                
                case 'm3u':
                    streams = parser.M3U.parse(response.body);
                    break;
                
                default:
                    error('Invalid stream playlist type %s', type);
            }
            
            var source = streams[0].file;
            
            // TODO: add Shoutcast support (parsed pls produces / url, no playable mp3)
            //    // Handle Shoutcast sources
            //    if (source.slice(-1) === '/') {
            //        source = source + 'listen.pls';
            //    }
            
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
        
        debug('Track source extension of %s is %s', source, extension);
        
        switch (extension) {
            case 'mp3':
                rawSource = source;
                break;
            
            case 'pls':
                rawSource = getSourceFromPls(source);
                break;
            
            case 'm3u':
                rawSource = getSourceFromM3u(source);
                break;
            
            default:
                debug('Undefined source type');
                
                // Provide a fallback, maybe the player
                // can handle the wrapping format
                rawSource = source;
        }
        
        return rawSource;
    }
    
};