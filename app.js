const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database);

//On Connected
mongoose.connection.on('connected', () => {
    console.log('Connected to database' + config.database);
});

//On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error:' + err);
});
const app = express();

const port = process.env.PORT || 8080;

const users = require('./routes/users')

//CORS Middleeware
app.use(cors());

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport)

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});