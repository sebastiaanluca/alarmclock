'use strict'

const debug = require('debug')('alarm:playlist')

import Track from './Track'

export default class {
    sources
    tracks

    constructor(sources) {
        this.sources = sources
    }

    async initialize() {
        debug('Creating playlist tracks from %s sources', this.sources.length)

        this.tracks = []

        for (const source of this.sources) {
            if (typeof source !== 'string') {
                debug('Track source is not a string. Skipping creating track.')

                continue
            }

            const track = await Track.create(source)

            if (track.getStream() === undefined || track.getStream() === null) {
                debug('Track is missing usable stream. Skipping adding track %s to playlist.', track.getSource())

                continue
            }

            this.tracks.push(track)
        }

        return this.tracks
    }

    getTracks() {
        return this.tracks
    }

    static async create(sources) {
        const instance = new this(sources)

        debug('Creating new playlist')

        await instance.initialize()

        return instance
    }
}
