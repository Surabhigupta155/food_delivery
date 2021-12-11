const router = require("express").Router();
const controller=require("../supplier/SupplierControl")
const passport=require("passport");
router.post('/signup', controller.signup)
  
router.post('/login', controller.login);

router.post('/logout', controller.logout)
  
router.post('/refresh_token', controller.refresh_token)

// router.post('/reset_password', controller.reset_pass)

// router.post('/forget_password', controller.forgot_pass)

router.get('/menu/:sid', controller.fetchmenu)

router.post('/register_menu', controller.registermenu)

router.post('/update_menu', controller.updatemenu)

router.get('/fetch_details/:email', controller.fetch_details);

router.post('/update_details', controller.update_details);

// router.post('/order_history', controller.order_history);

// router.post('/current_orders', controller.current_orders);

// router.post('/customer-reviews', controller.customer-reviews);

module.exports = router;