'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LevelSchema = Schema ({
	number: Number,
	letter: String,
    cicle: String,
    students: [{}]
})

module.exports = mongoose.model('Levels', LevelSchema)