const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const Students = require('./models/students.js')
const Levels = require('./models/levels.js')

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


app.get('/api/students', function(req, res) {

	Students.find((err, students ) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición` })
		if (!students) return res.status(500).send({ message: `No existen usuarios` })

		res.status(200).send({students})
	})

});	

app.get('/api/levels', function(req, res) {

	Levels.find((err, levels ) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición` })
		if (!levels) return res.status(500).send({ message: `No existen usuarios` })

		res.status(200).send({levels})
	})

});	

app.delete('/api/delete/students', function(req, res) {


	Students.remove((err, students ) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición` })
		if (!students) return res.status(500).send({ message: `No existen usuarios` })

		res.status(200).send({students})
	})

});	

app.delete('/api/delete/levels', function(req, res) {


	Levels.remove((err, levels ) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición` })
		if (!levels) return res.status(500).send({ message: `No existen usuarios` })

		res.status(200).send({levels})
	})

});	

app.post('/api/create/level', function(req, res) {

  let levels = new Levels()
  levels.number = req.body.number
  levels.letter = req.body.letter
  levels.cicle = req.body.cicle

  levels.save((err, createLevels) => {
    if (err)
    	res.status(500).send({message:`Error al guardar ${err}`})
      res.status(200).send({Levels: createLevels})
  })

})

app.post('/api/create/student', function(req, res) {

  let students = new Students()
  students.name = req.body.name
  students.lastname = req.body.lastname
  students.DNI = req.body.DNI
  students.genere = req.body.genere

  students.save((err, createStudents) => {
    if (err)
    	res.status(500).send({message:`Error al guardar ${err}`})
      res.status(200).send({Students: createStudents})
  })

})



mongoose.connect('mongodb://localhost/'+dbName,{ useNewUrlParser: true }).then(() => {
  console.log("Connected to Database", dbName);

  app.listen(port, () => {
    console.log("El servidor está inicializado en el puerto", port);
  })
 
  }).catch((err) => {
      console.log("Not Connected to Database ERROR! ", err);
});


