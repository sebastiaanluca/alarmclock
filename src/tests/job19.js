var fs = require('fs');

console.log('[Job19] Setting up a 60-minute interval to write to a file. It is now %s', (new Date()));

var log = function () {
    var string = '[Job19] 60-minute interval trigger! It is now ' + (new Date());
    
    console.log(string);
    
    fs.appendFile('job19.log', string + '\n', function (err) {
        if (err) {
            console.log('[Job19] Error writing to file job19.log');
        }
    });
};

setInterval(log, 1000 * 60 * 60);

console.log('[Job19] BOOTED');

log();