'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentsSchema = Schema ({
	name: String,
	level: String,
	rut: String,
	genere: String
})

module.exports = mongoose.model('Students', StudentsSchema)