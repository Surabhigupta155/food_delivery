const { Users } = require('../models')
const verifyOtp = require('../helpers/verifyOtp')
const router = require("express").Router();
const jwt = require('jsonwebtoken')
const generateAcessToken = require('../accessToken/generateAcessToken')
// const {encode,decode} = require("../middlewares/crypt")
// var otpGenerator = require('otp-generator');
// var AWS = require('aws-sdk');
// const crypto = require('crypto');

let refreshTokens = []

router.post('/token', async (req, res, next) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403)
    const accessToken = generateAcessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

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
          const userphone = userres.phone_no;
          let user = { name: username, phone_number: userphone };
          const accessToken = generateAcessToken(user)
          const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
          refreshTokens.push(refreshToken)
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