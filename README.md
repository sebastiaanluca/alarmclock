# Alarm Clock

## TODO

- [x] Check if Node setTimeOut() bug was solved and KeepAwake is no longer required
- [x] Exit process every ~2 days at night so Supervisor can restart it and it's refreshed
- [ ] Read time twice daily from Google calendar

## Requirements

### Node

### Yarn

### Amixer

`sudo apt-get install alsa-utils`

### Sound dev packages

`sudo apt-get install libasound2-dev`

See [https://www.npmjs.com/package/speaker]().

### Music Player Daemon

https://www.musicpd.org/

`sudo apt-get install mpd mpc`

Then see `/etc/mpd.conf`

### Supervisor

```
sudo apt-get install supervisor

sudo ln -nfs /home/pi/alarm-clock/supervisord.conf /etc/supervisor/conf.d/alarm.conf

sudo supervisorctl reread && sudo supervisorctl update
```

## References

- https://www.raspberrypi.org/forums/viewtopic.php?t=6056
