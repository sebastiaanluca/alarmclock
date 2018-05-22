'use strict'

const debug = require('debug')('alarm:clean-up')

export default class {
    process

    constructor(process) {
        this.process = process

        this.process.on('SIGTERM', this.quit.bind(this))
        this.process.on('SIGINT', this.quit.bind(this))
        this.process.on('uncaughtException', this.quitWithError.bind(this))
    }

    quit() {
        debug('Cleaning up application resources')

        process.emit('app:quit')

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
