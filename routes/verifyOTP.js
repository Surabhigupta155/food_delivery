const { Users } = require('../models')
const verifyOtp = require('../helpers/verifyOtp')
const router = require("express").Router();
const jwt = require('jsonwebtoken')
const generateAcessToken = require('../accessToken/generateAcessToken')
// const {encode,decode} = require("../middlewares/crypt")
// var otpGenerator = require('otp-generator');
// var AWS = require('aws-sdk');
// const crypto = require('crypto');


router.post('/verifyotp', async (req, res, next) => {

  try {

    const { otp, type, phone_number } = req.body;

    const verify_check = await verifyOtp(phone_number, otp);
    // console.log("==>", verif)
    if (verify_check === 'pending') {
      return res.status(500).json({ msg: 'Wrong OTP' })
    }
    else if (verify_check === 'canceled') {
      return res.status(500).json({ msg: 'User verification failed' })
    }
    else if (verify_check === 'approved') {
      if (type === 'signup') {
        await Users.update({ verified: true }, {
          where: {
            phone_no: phone_number
          }
        });
        return res.status(200).json({ msg: 'User signed in and verified successfully' })
      }
      else if (type === 'login') {
        const userres = await Users.findOne({ where: { phone_no: phone_number } })
        const verified = userres.verified;
        if (verified === true) {
          const username = userres.name;
          const user = { name: username }
          const accessToken = generateAcessToken(user)
          const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
          console.log(accessToken)
          return res.status(200).json({ msg: 'User logged in and verified successfully', accessToken: accessToken, refreshToken: refreshToken })
        }
        else {
          return res.status(500).json({ msg: 'Signup first' })
        }
      }
    }

  } catch (err) {
    const response = { "Status": "Failure", "Details": err.message }
    return res.status(400).send(response)
  }

});


module.exports = router;