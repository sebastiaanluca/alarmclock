'use strict'

const debug = require('debug')('alarm:clock')

import Moment from 'moment'
import Schedule from 'node-schedule'

export default class {
    player

    mixer
    targetVolume
    volumeIncreaseSteps = 10
    volumeIncreaseDuration
    increaseVolume
    currentVolume

    alarmTime
    snoozeAfter

    alarmJob
    volumeJob
    alarmEndJob

    constructor(player, volume) {
        this.player = player
        this.mixer = volume
    }

    start() {
        debug('Starting clock')

        this.cancelAlarmJob()
        this.cancelVolumeJob()
        this.cancelAlarmEndJob()

        this.alarmJob = Schedule.scheduleJob(
            {
                hour: this.alarmTime.hour(),
                minute: this.alarmTime.minute(),
            },
            this.onAlarmStart.bind(this)
        )
    }

    cancelAlarmJob() {
        if (this.alarmJob !== undefined) {
            this.alarmJob.cancel()
        }
    }

    cancelVolumeJob() {
        if (this.volumeJob !== undefined) {
            this.volumeJob.cancel()
        }
    }

    cancelAlarmEndJob() {
        if (this.alarmEndJob !== undefined) {
            this.alarmEndJob.cancel()
        }
    }

    scheduleVolumeIncreaseJob() {
        this.cancelVolumeJob()

        this.increaseVolume = Math.ceil(this.targetVolume / this.volumeIncreaseDuration / this.volumeIncreaseSteps)

        const seconds = Math.ceil(60 / this.volumeIncreaseSteps)

        debug('Scheduling volume increase job to run every %i seconds', seconds)

        this.volumeJob = Schedule.scheduleJob(
            '*/' + seconds + ' * * * * *',
            this.onAlarmVolumeIncrease.bind(this)
        )
    }

    scheduleAlarmEndJob() {
        this.cancelAlarmEndJob()

        const endTime = Moment(this.alarmTime)

        endTime.add(this.snoozeAfter, 'minutes')

        debug('Scheduling alarm end job at %s:%s', endTime.hour(), endTime.minute())

        this.alarmEndJob = Schedule.scheduleJob(
            {
                hour: endTime.hour(),
                minute: endTime.minute()
            },
            this.onAlarmEnd.bind(this)
        )
    }

    onAlarmStart() {
        (async () => {
            try {
                debug('Alarm started! It is now %s.', Moment().format('dddd, MMMM Do YYYY, HH:mm'))

                this.currentVolume = 0

                // Wait for the volume to be set to 0, otherwise we sometimes get a
                // gap where the volume is high and the player starts playing
                await this.mixer.setVolume(this.currentVolume)

                this.player.play()

                this.scheduleVolumeIncreaseJob()
                this.scheduleAlarmEndJob()
            } catch (error) {
                console.error(error)

                process.exit()
            }
        })()
    }

    onAlarmVolumeIncrease() {
        this.currentVolume = Math.ceil(this.currentVolume + this.increaseVolume)
        this.mixer.setVolume(this.currentVolume)

        debug('Increased volume by %i%', this.increaseVolume)

        if (this.currentVolume < this.targetVolume) {
            return
        }

        debug('Reached target volume (%i). Halting volume increase.', this.targetVolume)

        this.cancelVolumeJob()

        this.currentVolume = this.targetVolume
        this.mixer.setVolume(this.currentVolume)
    }

    onAlarmEnd() {
        debug('Alarm reached its end time. It is now %s.', Moment().format('dddd, MMMM Do YYYY, HH:mm'))

        this.cancelVolumeJob()
        this.cancelAlarmEndJob()

        this.player.stop()
    }

    setAlarmTime(hour, minute) {
        debug('Setting an alarm for %i:%i', hour, minute)

        this.alarmTime = Moment({hour: hour, minute: minute})
    }

    setVolumeIncreaseDuration(minutes) {
        debug('Setting volume increase duration to %i minutes', minutes)

        this.volumeIncreaseDuration = minutes
    }

    setTargetVolume(volume) {
        debug('Setting target volume to %i%', volume)

        this.targetVolume = volume
    }

    setSnoozeAfter(minutes) {
        debug('Setting snooze duration to %i minutes', minutes)

        this.snoozeAfter = minutes
    }
}
