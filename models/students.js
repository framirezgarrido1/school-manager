'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentsSchema = Schema ({
	name: String,
	type: String,
	level: Number,
	rut: String,
	genere: String
})

module.exports = mongoose.model('Students', StudentsSchema)