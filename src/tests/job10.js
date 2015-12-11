console.log('Setting up interval to run every minute');

setInterval(function () {
    console.log('Interval trigger! It is now %s', (new Date()));
}, 1000 * 60);