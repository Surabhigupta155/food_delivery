const router = require("express").Router();


router.post('/signup', async (req, res, next) => {
    return res.status(200).json({msg: "hello"})
  });
  
router.post('/login', async (req, res, next) => {
    return res.status(200).json({msg: "hello"})
});

router.post('/menu', async (req, res, next) => {
    return res.status(200).json({msg: "hello"})
});

router.post('/register-menu', async (req, res, next) => {
    return res.status(200).json({msg: "hello"})
});

router.post('/fetch_details', async (req, res, next) => {
    return res.status(200).json({msg: "hello"})
});

router.post('/update_details', async (req, res, next) => {
    return res.status(200).json({msg: "hello"})
});

router.post('/order_history', async (req, res, next) => {
    return res.status(200).json({msg: "hello"})
});

router.post('/current_orders', async (req, res, next) => {
    return res.status(200).json({msg: "hello"})
});

router.post('/customer1-revies', async (req, res, next) => {
    return res.status(200).json({msg: "hello"})
});
module.exports = router;