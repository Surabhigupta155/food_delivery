const { Users } = require('../models')
const sendOtp = require('../helpers/sendOtp')
const router = require("express").Router();
// const {encode,decode} = require("../middlewares/crypt")
// var otpGenerator = require('otp-generator');
// var AWS = require('aws-sdk');
// const crypto = require('crypto');

router.post('/signup', async (req, res, next) => {

    
    try {

        const { name, phone_number } = req.body;

        const rowdbres = await Users.findOne({ where: { phone_no: phone_number } })
        console.log('====', rowdbres);

        let otp_status;

        if (rowdbres !== null) {
            return res.status(200).json({ msg: 'User already exists' })
        }
        else {
            try {
                console.error("reached here1");
                if(phone_number.length != 10){
                    return res.status(500).json({ msg: 'Phone Number is Wrong.' })
                }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                await Users.create({
                    name: name,
                    phone_no: phone_number,
                    verified: false
                })
                
                otp_status = await sendOtp(phone_number);
                console.error("reached here2");
                console.log("==>", otp_status);
            
            } catch (e) {
                res.status(500).send(e.toString());
            }
        }
        

        if (otp_status !== 'pending') {
            return res.status(500).json({ msg: 'Something went wrong' })
        } else {
            return res.status(200).json({ msg: 'User Registered Sucessfully' })
        }

    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }

});


module.exports = router;