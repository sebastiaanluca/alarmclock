# Alarm Clock

## About

### What
NodeJS alarm clock for the Raspberry Pi (but should work on any platform).

### Goal
To provide a pleasant way to wake up, as I keep hitting snooze on all my other alarm clocks :)

### (Possible) Features
- [x] Support for multiple streams
- [ ] Enhanced error handling
- [x] Backup streams/audio
- [x] Play/pause (GPIO)
- [x] Next stream/track (GPIO)
- [x] Volume (GPIO) 
- [ ] Physical snooze
- [x] Remote control (through any MPD/MPC app)
- [ ] Set alarm times through Google calendar
- [ ] AirPlay support to use it as a generic audio device
- [ ] Fix an async.io bug (crashes when too many MPC play events are triggered)

## Installation

### Pi GPIO

The NPM `pigpio` requires the `pigpio` C library.
 
 ```
 wget abyz.co.uk/rpi/pigpio/pigpio.zip
 unzip pigpio.zip
 cd PIGPIO
 make
 sudo make install
 ```
 
### MPC

#### Local Media

When adding local media stored in `~/Music`, make sure you have enough permissions to access it and remember to update the MPD database first using `mpc update`.

## Development

### Debugging
Run `clear && NODE_PATH=src/ DEBUG=alarmclock:*,SebastiaanLuca:* node src/app.js` as __root__ (`sudo su root`) to execute and debug the application.