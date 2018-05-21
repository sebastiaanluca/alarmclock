'use strict'

const debug = require('debug')('alarm:config')

import readFilePromise from 'fs-readfile-promise'
import _ from 'lodash'

export default class {
    path = './config'
    file
    config

    constructor(file) {
        this.file = file
    }

    async load() {
        const path = `${this.path}/${this.file}`

        debug(`Loading configuration file from ${path}`)

        const file = await readFilePromise(path, 'utf8')

        this.config = JSON.parse(file)

        debug('Configuration loaded')

        return this.config
    }

    get(key) {
        return _.get(this.config, key)
    }

    static async create(file) {
        const instance = new this(file)

        await instance.load()

        return instance
    }
}





