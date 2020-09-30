const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const Students = require('./models/students.js')
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

app.delete('/api/delete/all', function(req, res) {

	Students.remove((err, students ) => {
		if (err) return res.status(500).send({ message: `Error al realizar la petición` })
		if (!students) return res.status(500).send({ message: `No existen usuarios` })

		res.status(200).send({students})
	})

});	

app.post('/api/create', function(req, res) {

  let students = new Students()
  students.name = req.body.name
  students.level = req.body.level
  students.rut = req.body.rut
  students.genere = req.body.genere

  students.save((err, createStudent) => {
    if (err)
    	res.status(500).send({message:`Error al guardar ${err}`})
      res.status(200).send({Student: createStudent})
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


