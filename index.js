const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const Students = require('./models/students.js')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const dbName = "school-manager-db";
const port = 3005;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});


app.get('/api', function(req, res) {
	res.send('Saludos desde express');
});	

mongoose.connect('mongodb://localhost/'+dbName,{ useNewUrlParser: true }).then(() => {
  console.log("Connected to Database", dbName);

  app.listen(port, () => {
    console.log("El servidor está inicializado en el puerto", port);
  })
 
  }).catch((err) => {
      console.log("Not Connected to Database ERROR! ", err);
});


