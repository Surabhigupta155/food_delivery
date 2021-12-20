const router = require("express").Router();
const controller=require("../supplier/SupplierControl")
const passport=require("passport");
router.post('/signup', controller.signup)
  
router.post('/login', controller.login);

router.post('/logout', passport.authenticate('jwt', { session: false }),controller.logout)
  
router.post('/refresh_token', controller.refresh_token)

// router.post('/reset_password', controller.reset_pass)

// router.post('/forget_password', controller.forgot_pass)

router.get('/menu/:sid',passport.authenticate('jwt', { session: false }), controller.fetchmenu)

router.post('/register_menu',passport.authenticate('jwt', { session: false }), controller.registermenu)

router.post('/update_menu',passport.authenticate('jwt', { session: false }), controller.updatemenu)

router.get('/fetch_details/:email', passport.authenticate('jwt', { session: false }),controller.fetch_details);

router.post('/update_details', passport.authenticate('jwt', { session: false }),controller.update_details);

router.post('/order_history',passport.authenticate('jwt', { session: false }), controller.order_history);

// router.post('/current_orders',passport.authenticate('jwt', { session: false }), controller.current_orders);

// router.post('/customer-reviews',passport.authenticate('jwt', { session: false }), controller.customer-reviews);

module.exports = router;