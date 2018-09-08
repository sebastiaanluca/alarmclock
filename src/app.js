'use strict'

const debug = require('debug')('alarm:app')

debug('Spinning up alarm clock')

import Config from './Config'
import Volume from './Volume'
import Player from './Player'
import Clock from './Clock'

(async () => {
    try {
        const config = await Config.create('default.json')
        const volume = new Volume(config.get('volume'))
        const player = await Player.create(config.get('tracks'))

        player.setRepeat(true)

        const clock = new Clock(
            player,
            volume
        )

        clock.setAlarmTime(
            config.get('alarm.hour'),
            config.get('alarm.minute')
        )

        clock.setVolumeIncreaseDuration(
            config.get('alarm.volumeIncreaseDuration')
        )

        clock.setTargetVolume(config.get('volume'))

        clock.setSnoozeAfter(
            config.get('alarm.snoozeAfter')
        )

        clock.start()
    } catch (error) {
        console.error(error)

        process.exit()
    }
})()
