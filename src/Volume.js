'use strict'

const debug = require('debug')('alarm:volume')

import Loudness from 'loudness'

export default class {
    constructor(volume) {
        this.setVolume(volume)
    }

    setVolume(volume) {
        if (volume === undefined) {
            console.error('Error setting volume (volume undefined)')

            return
        }

        if (volume < 0) {
            volume = 0
        } else if (volume > 100) {
            volume = 100
        }

        return new Promise((resolve, reject) => {
            Loudness.setVolume(volume, error => {
                if (error) {
                    reject(error)

                    return
                }

                debug('System volume set to %i%', volume)

                resolve()
            })
        })
    }
}
