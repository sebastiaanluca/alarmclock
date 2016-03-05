var debug = require('debug')('SebastiaanLuca:Controls:Peripherals:Button');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

// TODO: switch to pigpio
var Gpio = require('onoff').Gpio;

//

var Button = function Button(pin) {
    
    var self = this;
    
    var button = new Gpio(pin, 'in', 'both');
    var bounceTime = (new Date().getTime());
    
    
    
    var init = function () {
        button.watch(function (err, status) {
            if (err) {
                throw err;
            }
            
            // Button released
            if (status != 1) {
                self.emit('released');
                
                return;
            }
            
            // Manually handle contact bounce
            // @ http://arduino.stackexchange.com/questions/408/why-does-my-sketch-report-too-many-button-presses
            var timeDifference = (new Date().getTime()) - bounceTime;
            
            if (timeDifference < 200) {
                debug('Contact bounce detected, skipping button press!');
                
                return;
            }
            
            // Handle button press
            debug('Button pressed');
            
            self.emit('pressed');
            
            // Save current time for future reference
            bounceTime = (new Date().getTime());
        });
    };
    
    
    
    var quitHandler = function () {
        button.unexport();
    };
    
    
    
    // Gracefully exit on CTRL+C and errors
    process.on('forceQuitApplication', quitHandler);
    
    
    
    init();
    
};

//

util.inherits(Button, EventEmitter);

module.exports = Button;