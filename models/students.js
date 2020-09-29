'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentsSchema = Schema ({
	name: String,
	type: String,
	pin: Number,
	status: Number,
	topic: String
})

module.exports = mongoose.model('Students', StudentsSchema)