require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const passport = require('passport')
require('./config/passports')(passport);

const { sequelize, OTP } = require('./models')

const app = express()

const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize());

var cors = require('cors');
var corsOption = {
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));

app.use(helmet())

app.use(logger('common'))

const signup = require('./routes/signup');
const verify_otp = require('./routes/verifyOTP');
const login = require('./routes/login');
// const testing = require('./routes/testing');

app.use('/api/v1/', signup);
app.use('/api/v1/', verify_otp);
app.use('/api/v1/', login);

// app.use('/abhyam', testing);

app.get('/', function (req, res) {
    console.log('route / is accessed');
    res.send('Hi');
})


app.get('/list', passport.authenticate('jwt', {session:false}), function(req, res){
    res.send('you are authorized')
}
);

app.listen(port, async() => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database Connected!');
})