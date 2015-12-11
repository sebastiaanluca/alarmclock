console.log('Setting up 2 intervals to run every 60 minutes');

setInterval(function () {
    console.log('Non-variable interval trigger! It is now %s', (new Date()));
}, 1000 * 60 * 60);

var interval = setInterval(function () {
    console.log('Variable interval trigger! It is now %s', (new Date()));
}, 1000 * 60 * 60);