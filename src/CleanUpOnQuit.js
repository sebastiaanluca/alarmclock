'use strict'

const debug = require('debug')('alarm:CleanUpOnQuit')

export default class {
    process

    constructor(process) {
        this.process = process

        this.process.on('SIGTERM', this.quit)
        this.process.on('SIGINT', this.quit)
        this.process.on('uncaughtException', this.quitWithError)
    }

    quit() {
        debug('Cleaning up application resources')

        process.emit('app:quit:force')

        // Give the rest of the application some time to handle their affairs
        setTimeout(function () {
            debug('Quitting application')

            // Gracefully quit application
            process.exit()
        }, 1000)
    }

    quitWithError(error) {
        debug(error)

        this.quit()
    }
}
