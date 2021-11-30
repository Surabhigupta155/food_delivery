const router = require("express").Router();


router.post('/test', async (req, res, next) => {
    return res.status(200).json({msg: "hello"})
  });
  
   
module.exports = router;