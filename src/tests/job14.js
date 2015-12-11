console.log('Setting up interval to run every 20 minutes');

var interval = setInterval(function () {
    console.log('Interval trigger! It is now %s', (new Date()));
}, 1000 * 60 * 20);