const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const Student = require('./models/students.js')
const Level = require('./models/levels.js')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const dbName = "schoolManagerDB";
const port = 3005;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});


app.get('/api', function(req, res) {
	res.send('Status: OK!');
});	


app.get('/api/students/all', function(req, res) {

	Student.find((err, students ) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición` })
		if (!students) return res.status(500).send({ message: `No existen usuarios` })

		res.status(200).send(students)
	})

});	

app.get('/api/students/:level', function(req, res) {

  let level = req.params.level

	Student.find({codGrado:level}, (err, students ) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición` })
		if (!students) return res.status(500).send({ message: `No existen usuarios` })

		res.status(200).send(students)
	})

});	

app.get('/api/students/only/:id', function(req, res) {

  let id = req.params.id

	Student.find({_id:id}, (err, students ) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición` })
		if (!students) return res.status(500).send({ message: `No existen usuarios` })

		res.status(200).send(students)
	})

});	


app.get('/api/levels', function(req, res) {

	Level.find((err, levels ) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición` })
		if (!levels) return res.status(500).send({ message: `No existen usuarios` })

		res.status(200).send({levels})
	})

});	

app.get('/api/all', function(req, res) {

	Level.find((err, levels ) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición` })
		if (!levels) return res.status(500).send({ message: `No existen usuarios` })

    Student.populate(levels, {path: "student"}, function(err, levels){
      res.status(200).send(levels)
    })

	})

});	


app.delete('/api/delete/students', function(req, res) {

	Student.remove((err, students ) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición` })
		if (!students) return res.status(500).send({ message: `No existen usuarios` })

		res.status(200).send(students)
	})

});	

app.delete('/api/delete/levels', function(req, res) {

	Level.remove((err, levels ) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición` })
		if (!levels) return res.status(500).send({ message: `No existen usuarios` })

		res.status(200).send({levels})
	})

});	


app.post('/api/update/:student/:data/:value', function(req, res) {

  let student = req.params.student
  let data = req.params.data
  let value = req.params.value

  var obj = {};            // create object
  obj[data] = value;  // set value

  Student.findByIdAndUpdate(req.params.student, obj, (err, students) => {
    if (err)
    	res.status(500).send({message:`Error al guardar ${err}`})
      res.status(200).send(students)
  })

})

app.post('/api/create/level', function(req, res) {

  let levels = new Level()
  levels.number = req.body.number
  levels.letter = req.body.letter
  levels.cicle = req.body.cicle
  levels.student = req.body.student

  levels.save((err, level) => {
    if (err)
    	res.status(500).send({message:`Error al guardar ${err}`})
      res.status(200).send({level})
  })

})

app.post('/api/create/student', function(req, res) {

  let students = new Student()
  students.level = req.body.level
  students.letterLevel = req.body.letterLevel
  students.names = req.body.names
  students.fatherLastname = req.body.fatherLastname
  students.motherLastname = req.body.motherLastname
  students.DNI = req.body.DNI
  students.birthDate = req.body.birthDate
  students.genere = req.body.genere
  students.nationality = req.body.nationality
  students.email = req.body.email
  students.phone = req.body.phone

  students.save((err, student) => {
    if (err)
    	res.status(500).send({message:`Error al guardar ${err}`})
      res.status(200).send(student)
  })

})

mongoose.connect('mongodb+srv://Fernando:Amelia0920@cluster0.caoxf.mongodb.net/schoolManagerDB?retryWrites=true&w=majority',{ useNewUrlParser: true }).then(() => {
  console.log("Connected to Database", dbName);

  app.listen(port, () => {
    console.log("El servidor está inicializado en el puerto", port);
  })
 
  }).catch((err) => {
      console.log("Not Connected to Database ERROR! ", err);
});


