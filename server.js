const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config2/keys').mongoURI;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const users = require('./routes/api/users');

app.use('/api/users', users); //to use router path

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get('/', (req, res) =>res.send('Hello'));

const port = process.env.PORT || 5000; //server checks for port or goes to port number 5000

app.listen(port, () => console.log('Application listening on port ', port));