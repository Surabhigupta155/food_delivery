const router = require("express").Router();
const passport = require('passport')
const moment = require('moment');
// const set_redis = require('../redis/redis_setup')
// const get_redis = require('../redis/redis_setup')
require('../config/passports.js')(passport);

const { Supplier } = require('../models')
const { Products } = require('../models')
const { orders } = require('../models')
const { Reviews } = require('../models')
const { Users } = require('../models')

const redis = require('redis')

const redis_port = process.env.PORT || 6379;

const client = redis.createClient(redis_port);

client.on("connect", function () {
    console.log("Connection Successful with redis!!");
});

client.on("error", (err) => {
    console.log('error occured', err);
});

async function set_redis(token, value) {
    const r = client.setex(
        `token:${token}`, 540000, JSON.stringify(value), function (err) {
            console.log(err)
        }
    )
    console.log('value of r', r)
    console.log('value of value', value)
    let arr = ['abc', 'abc']
    return arr
}

async function get_redis(token) {
    return new Promise((resolve, reject) => {
        client.get(`token:${token}`, function (err, value) {
            if (!value) resolve(null)
            else resolve(JSON.parse(value))
        })
    })
}

router.get('/getsuppliers', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const suppliers = await Supplier.findAll();
        return res.status(200).json(suppliers)
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

router.get('/getproducts', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const products = await Products.findAll();
        return res.status(200).json(products)
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

router.get('/getreviews', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const reviews = await Reviews.findAll();
        return res.status(200).json(reviews)
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

router.post('/reviews', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { review, p_id } = req.body;
        const userobj = await req.user
        const userid = userobj.id
        const reviewadded = await Reviews.create({
            time_date: moment().format("MMM Do YY"),
            review: review,
            c_id: userid,
            p_id: p_id
        })
        return res.status(200).json({ review: reviewadded })
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

router.put('/profile', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { id, name, email, address, dob } = req.body;
        await Users.update({ name: name, email: email, address: address, dob: dob }, {
            where: {
                id: id
            }
        });
        return res.status(200).json({ msg: 'User profile updated' })
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }

});

router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const userobj = await req.user
        const userid = userobj.id
        const customerprofile = await Users.findOne({ where: { id: userid } });
        return res.status(200).json(customerprofile)
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

router.post('/cart', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { pid } = req.body;
        const userobj = await req.user
        const userid = userobj.id
        const prodres = await Products.findOne({ where: { id: pid } })
        const product_price = prodres.product_price
        const s_id = prodres.s_id
        let obj = {
            p_id: pid,
            qnty: 1,
            price: product_price,
            s_id: s_id
        }
        const getobj = await get_redis(userid)
        if (getobj == null) {
            getobj = []
            getobj.push(obj)
            const t = await set_redis(userid, getobj)
            return res.status(200).json({ msg: 'cart added successfully', cartvalue: obj, cid: userid })
        }
        else if (getobj.some(e => e.p_id === pid)) {
            return res.status(400).send({ msg: 'item already added in the cart' })
        }
        else {
            getobj.push(obj)
            const t = await set_redis(userid, getobj)
            // console.log(t);
            return res.status(200).json({ msg: 'cart added successfully', cartvalue: obj, cid: userid })
        }
        // console.log('parsed json is', getobj);
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

router.get('/cart', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const userobj = await req.user
        const userid = userobj.id
        const cart = await get_redis(userid);
        return res.status(200).json(cart)
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

router.put('/cart', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { pid, qnty } = req.body;
        const userobj = await req.user
        const userid = userobj.id
        const getobj = await get_redis(userid)
        getobj.map((a) => {
            { a.p_id === pid ? a.qnty = qnty : null }
        })
        await set_redis(userid, getobj)
        return res.status(200).json({ msg: 'cart updated successfully', cartvalue: getobj, cid: userid })
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

router.delete('/cart', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const { pid } = req.body;
        const userobj = await req.user
        const userid = userobj.id
        const getobj = await get_redis(userid)
        const index = getobj.findIndex(a => a.p_id === pid);
        getobj.splice(index, 1)
        await set_redis(userid, getobj)
        return res.status(200).json({ msg: 'cart object deleted successfully', cartvalue: getobj, cid: userid })
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

router.post('/orders', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const userobj = await req.user
        const userid = userobj.id
        const useraddress = userobj.address
        const getobj = await get_redis(userid)
        getobj.map(a => {
            try {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                const res = orders.create({
                    c_id: userid,
                    p_id: a.p_id,
                    s_id: a.s_id,
                    quantity: a.qnty,
                    address: useraddress,
                    total_price: a.qnty*a.price,
                    time_date: moment().format("MMM Do YY"),
                    status: 'pending'
                })
                if (res){
                    set_redis(userid, [])
                }
            } catch (e) {
                res.status(500).send(e.toString());
            }
        })
        return res.status(200).json({ msg: 'Orders added successfully'})
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

router.get('/orders', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const orderslist = await orders.findAll();
        return res.status(200).json(orderslist)
    } catch (err) {
        const response = { "Status": "Failure", "Details": err.message }
        return res.status(400).send(response)
    }
});

/* 
status --> canceled, delivered, food prepared, pending
customer address
s_id
total_price_of_order

profile{
    put method
}

c_id, p_id, qnty, price/item

ke=c_id
value=JSON>stringigy({
    {p_id: "p_id",
    qnty,
    price,
    s_id},
    {}
})
*/

module.exports = router;