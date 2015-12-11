console.log('Setting up a 60-minute interval. It is now %s', (new Date()));

setInterval(function () {
    console.log('60-minute interval trigger! It is now %s', (new Date()));
}, 1000 * 60 * 60);

console.log('BOOTED');