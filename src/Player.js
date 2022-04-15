'use strict'

const debug = require('debug')('alarm:player')

import Komponist from 'komponist'
import Playlist from './Playlist'

export default class
{
    sources
    playlist
    player

    constructor(sources) {
        this.sources = sources
    }

    async initialize() {
        this.playlist = await Playlist.create(this.sources)

        this.player = await this.initializePlayer()

        // Clear the active playlist
        this.player.clear()

        this.addTracksToPlayer(this.playlist, this.player)
    }

    initializePlayer() {
        return new Promise(resolve => {
            debug('Connecting to Music Player daemon')

            Komponist.createConnection(6600, 'localhost', (ignored, client) => {
                debug('Connected to Music Player daemon')

                resolve(client)
            })
        })
    }

    addTracksToPlayer(playlist, player) {
        for (const track of playlist.getTracks()) {
            this.addTrackToPlayer(track, player)
        }
    }

    addTrackToPlayer(track, player) {
        const stream = track.getStream()

        debug('Adding track %s to player', stream)

        player.add(stream, function (error) {
            if (error) {
                debug('Error adding track %s to player (error: %s', stream, error.message)
            }
        })
    }

    setRepeat(repeat) {
        this.player.repeat(repeat === true ? 1 : 0)
    }

    shuffle() {
        this.player.random()
    }

    play() {
        debug('Starting playback')

        this.player.play()
    }

    pause() {
        debug('Pausing playback')

        this.player.toggle()
    }

    stop() {
        debug('Stopping playback')

        this.player.stop()
    }

    static async create(sources) {
        const instance = new this(sources)

        debug('Creating new player')

        await instance.initialize()

        return instance
    }
}
