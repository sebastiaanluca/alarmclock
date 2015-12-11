console.log('Setting up interval to run every hour');

setInterval(function () {
    console.log('Interval trigger! It is now %s', (new Date()));
}, 1000 * 60 * 60);