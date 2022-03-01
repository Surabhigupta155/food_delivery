require('dotenv').config();
const express = require('express');
const app = express()
const path = require('path');
const helmet = require('helmet');
const logger = require('morgan');
const cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const passport=require('passport');
require('./supplier/config/auth');
app.use(passport.initialize())
const passport = require('passport')
require('./config/passports')(passport);

const { sequelize, OTP } = require('./models')
const { Products } = require('./models')
const { Supplier } = require('./models')

const port = process.env.PORT || 5000;

const app = express()

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
const supplier = require('./routes/supplier');
const customer = require('./routes/customer');
// const testing = require('./routes/testing');

app.use('/api/v1/', signup);
app.use('/api/v1/', verify_otp);
app.use('/api/v1/', login);
app.use('/api/v1/customer/', customer);
app.use('/api/v1/supplier/', supplier);

// app.use('/abhyam', testing);
// async function add(){
//     await Products.create({
//         product_name: 'product1',
//         product_price: 200,
//         description: 'description1',
//         s_id: 1
//     })
//     // await Products.create({
//     //     product_name: 'product2',
//     //     product_price: 300,
//     //     description: 'description2',
//     //     s_id: 1
//     // })
// }
// add();

// async function add(){
//         // await Products.create({
//         //     product_name: 'product1',
//         //     product_price: 200,
//         //     description: 'description1',
//         //     s_id: 1
//         // })
//         await Supplier.create({
//             supplier_name: 'abc',
//             address: 'abc, abc, abc',
//             phone_no: '9999999999',
//             verified: true,
//             email: 'abc@gmail.com',
//             rating: 3,
//             working_hours: '6'
//         })
//     }
//     add();

app.post('/whatsapp', async (req, res) => {
    console.log(req.body);
})

app.get('/', function (req, res) {
    console.log('route / is accessed');
    res.send('Hi');
})


app.get('/list', passport.authenticate('jwt', {session:false}), async(req, res, next) => { 
    const userobj = await req.user
    const userid = userobj.id
    console.log("***===", userid);
    return res.status(200).json({ msg: 'authentication successfull' })
})

app.listen(port, async() => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database Connected!');
})