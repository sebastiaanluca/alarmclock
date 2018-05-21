# Alarm Clock

## TODO

- [ ] Set up Supervisor script
- [ ] Check if Node setTimeOut() bug was solved and KeepAwake is no longer required
- [ ] Exit process every ~2 days at night so Supervisor can restart it and it's refreshed
- [ ] Read time twice daily from Google calendar

## Requirements

### Amixer

`sudo apt-get install alsa-utils`

### Sound dev packages

`sudo apt-get install libasound2-dev`

See [https://www.npmjs.com/package/speaker]().

### Music Player Daemon

https://www.musicpd.org/

`sudo apt-get install mpd mpc`

Then see `/etc/mpd.conf`

## Build process

1. `yarn run dev` in the vagrant virtual machine
2. Upload (CMD+SHIFT+D) build/alarm.js to the Raspberry Pi
3. `clear && DEBUG=alarm:* node alarm.js` on the Raspberry Pi

## References

- https://www.raspberrypi.org/forums/viewtopic.php?t=6056
