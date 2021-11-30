const { Users } = require('../models')
const verifyOtp = require('../helpers/verifyOtp')
const router = require("express").Router();
// const {encode,decode} = require("../middlewares/crypt")
// var otpGenerator = require('otp-generator');
// var AWS = require('aws-sdk');
// const crypto = require('crypto');


router.post('/verifyotp', async (req, res, next) => {

  try {

    const { otp, type, phone_number } = req.body;

    const verify_check = await verifyOtp(phone_number, otp);
    // console.log("==>", verif)
    if (type == 'signup') {
      if (verify_check === 'pending') {
        return res.status(500).json({ msg: 'Wrong OTP' })
      }
      else if (verify_check === 'canceled') {
        return res.status(500).json({ msg: 'User verification failed' })
      }
      else if (verify_check === 'approved') {
        await Users.update({ verified: true }, {
          where: {
            phone_no: phone_number
          }
        });
        return res.status(200).json({ msg: 'User verified successfully' })
      }
    }

  } catch (err) {
    const response = { "Status": "Failure", "Details": err.message }
    return res.status(400).send(response)
  }

});


module.exports = router;