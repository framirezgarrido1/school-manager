'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Student = mongoose.model('Student')

const LevelSchema = Schema ({
	number: Number,
	letter: String,
    cicle: String,
    student: { type: Schema.ObjectId, ref: "Student" } 
})

module.exports = mongoose.model('Level', LevelSchema)