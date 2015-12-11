console.log('[Job20] Setting up a 60-minute interval. It is now', new Date(), '\r');

var log = function () {
    console.log('60-minute interval trigger! It is now', new Date(), '\r');
};

setInterval(log, 1000 * 60 * 60);

console.log('BOOTED');

log();