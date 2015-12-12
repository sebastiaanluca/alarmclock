# Alarm Clock

## About

### What
NodeJS alarm clock for the Raspberry Pi (but should work on any platform).

### Goal
To provide a pleasant way to wake up, as I keep hitting snooze on all my other alarm clocks :)

### (Possible) Features
√ Support for multiple streams
? Enhanced error handling and backup streams/audio
√ Play/pause (GPIO)
√ Next stream/track (GPIO)
√ Volume (GPIO) 
- Physical snooze
√ Remote control (through any MPD/MPC app)
- Set alarm times through Google calendar
- AirPlay support to use it as a generic audio device

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

## Development

### Debugging
Run `clear && NODE_PATH=src/ DEBUG=alarmclock:*,SebastiaanLuca:* node src/app.js` to execute and debug the application.