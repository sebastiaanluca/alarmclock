console.log('Setting up 3 timers at 20, 40, and 60 minutes. It is now %s', (new Date()));

setInterval(function () {
    console.log('20-minute interval trigger! It is now %s', (new Date()));
}, 1000 * 60 * 20);

setInterval(function () {
    console.log('40-minute interval trigger! It is now %s', (new Date()));
}, 1000 * 60 * 40);

setInterval(function () {
    console.log('60-minute interval trigger! It is now %s', (new Date()));
}, 1000 * 60 * 60);

console.log('BOOTED');