'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LevelSchema = Schema ({
	number: Number,
	letter: String,
	count: Number,
	cicle: Number
})

module.exports = mongoose.model('Level', LevelSchema)