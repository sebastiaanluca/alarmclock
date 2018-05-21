'use strict'

const debug = require('debug')('alarm:track')

import Axios from 'axios'
import Parser from 'playlist-parser'
import {getFileExtension} from './StringHelper'

export default class {
    source
    stream

    constructor(source) {
        this.source = source
    }

    async load() {
        // Cache result
        if (this.stream !== undefined) {
            return stream
        }

        switch (getFileExtension(this.source)) {
            case 'pls':
                return this.stream = await this.getStreamFromPlsSource(this.source)
            case 'm3u':
                return this.stream = await this.getStreamFromM3uSource(this.source)
            case 'mp3':
                return this.stream = this.source

            default:
                debug('Undefined source type %s. Letting the player handle the raw source.', this.source)
        }

        return this.stream = this.source
    }

    async getStreamFromPlsSource(source) {
        debug('Building PLS stream for %s', source)

        const contents = await this.getStreamContentsFromSource(source)

        if (contents === false) {
            return null
        }

        try {
            return Parser.PLS.parse(contents)[0].file
        } catch (error) {
            debug('Unable to parse stream content of %s (error: %s)', source, error.message)
        }

        return null
    }

    async getStreamFromM3uSource(source) {
        debug('Building M3U stream for %s', source)

        const contents = await this.getStreamContentsFromSource(source)

        if (contents === false) {
            return null
        }

        try {
            return Parser.M3U.parse(contents)[0].file
        } catch (error) {
            debug('Unable to parse stream content of %s (error: %s)', source, error.message)
        }

        return null
    }

    async getStreamContentsFromSource(source) {
        debug('Reading stream source of %s', source)

        try {
            const response = await Axios(source, {
                timeout: 3000,
            })

            return response.data
        } catch (error) {
            debug('Unable to get stream contents of %s (error: %s)', source, error.message)
        }

        return false
    }

    getSource() {
        return this.source
    }

    getStream() {
        return this.stream
    }

    static async create(source) {
        const instance = new this(source)

        debug('Creating new track')

        await instance.load()

        return instance
    }
}
