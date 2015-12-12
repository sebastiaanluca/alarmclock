var debug = require('debug')('SebastiaanLuca:Controls:Peripherals:Led');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Gpio = require('pigpio').Gpio;

//

var Led = function Led(pin) {
    
    var self = this;
    
    var led = new Gpio(pin, {mode: Gpio.OUTPUT});
    
    var pulseInterval;
    var currentPulseValue = 0;
    var pulseIncrement = 5;
    
    var DEFAULT_PULSE_INCREMENT = 5;
    
    
    
    var init = function () {
        self.reset();
    };
    
    
    
    var quitHandler = function () {
        // alarmIndicatorLed.close(); // Unsupported
    };
    
    
    
    // Gracefully exit on CTRL+C and errors
    process.on('forceQuitApplication', quitHandler);
    
    
    
    //
    
    
    
    self.enable = function (enable) {
        led.digitalWrite(enable == true ? 1 : 0);
    };
    
    self.pulse = function (enable) {
        // Stop the pulsing
        if (enable != true) {
            clearInterval(pulseInterval);
            
            pulseInterval = null;
            currentPulseValue = 0;
            pulseIncrement = DEFAULT_PULSE_INCREMENT;
            
            // Turn off LED
            self.enable(false);
            
            return;
        }
        
        // Start pulsing
        pulseInterval = setInterval(function () {
            led.pwmWrite(currentPulseValue);
            
            currentPulseValue += pulseIncrement;
            
            // Reverse
            if (currentPulseValue <= 0 || currentPulseValue >= 255) {
                pulseIncrement = -pulseIncrement;
            }
        }, 20);
    };
    
    self.reset = function () {
        self.pulse(false);
        self.enable(false);
    };
    
    
    
    //
    
    
    init();
    
};

//

util.inherits(Led, EventEmitter);

module.exports = Led;