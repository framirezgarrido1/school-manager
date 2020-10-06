'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentsSchema = Schema ({
	names: String,
	fatherLastname: String,
	motherLastname: String,
	DNI: String,
	birthDate: String,
	genere: String,
	nationality: String,
	email: String,
	phone: String,
})

module.exports = mongoose.model('Student', StudentsSchema)