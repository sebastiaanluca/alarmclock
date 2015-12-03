var debug = require('debug')('SebastiaanLuca:Helpers:StringHelper');

var StringHelper = function () {
    
    this.getFileExtension = function (filename) {
        var ext = /^.+\.([^.]+)$/.exec(filename);
        
        return ext == null ? '' : ext[1];
    }
    
};

// Singleton
module.exports = new StringHelper();