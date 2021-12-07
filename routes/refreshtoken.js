const { Users } = require('../models')
const verifyOtp = require('../helpers/verifyOtp')
const router = require("express").Router();
const jwt = require('jsonwebtoken')
const generateAcessToken = require('../accessToken/generateAcessToken')

router.post('/token', async (req, res, next) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    // if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if(err) return res.sendStatus(403)
      const accessToken = generateAcessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
  })

  module.exports = router;