const { disable } = require("debug");
const db = require("./db/db");
const passport=require("passport");
const moment = require("moment");
const crypto = require("crypto-js").SHA256;
var rn = require("random-number");
const  jwt  = require("jsonwebtoken");
var gen = rn.generator({
  min: 0,
  max: 1000,
  integer: true,
});

function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30m'});
}
function generateRefreshToken(user){
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30m'});
}
async function get_redis(token){
  return new Promise((resolve, reject)=>{
    client.get(`token:${token}`,function(err, value){
      if(!value) resolve(null)
      else resolve(value)
    })
  })
}
async function set_redis(token){
  client.setex(
    `token:${token}`, 540000, "blacklist", function(err){
      console.log(err)
    }
  )
}
module.exports.signup = (req, res) => {
  const password = crypto(req.body.password) + "",
    created = moment().format("YYYY-MM-DD HH:MM:SS ZZ"),
    id = gen();
  // console.log(password)
  db.insert("public", "supplier", " ", [
    id,
    req.body.name,
    req.body.address,
    req.body.phone_number,
    req.body.verify,
    req.body.email,
    req.body.rating,
    req.body.work_hours,
    created,
    created,
    password,
  ]).then((data) => {
    if (data) res.send("insert_successful");
    else console.log("error");
  });
};

module.exports.login = (req, res) => {
 
  passport.authenticate('json', async(err, user,info)=>{
    console.log("+++++++++++++++++++++++")
    try{
      console.log("+++++++++++++++++++++++")
      if(err||!user){
        return res.status(info.status).send(info.message)
      }
      req.login(user,{session:false},async(error)=>{
        if(error) return next(error);
        const token=generateAccessToken({
          user:user.email
        })
        const refresh_token=generateRefreshToken({
          user:user.email
        })
        return res.json({
          accessToken:token,
          refresh_token:refresh_token,
          email:""+crypto(user.email)
        })
      })
    }
    catch(e){
      console.log("+++++++++++++++++++++++")
      return res.status(404).send(e)
    }
  })
};

module.exports.logout = async (req, res) => {
  const refreshToken=req.body.refresh_token;
  const accessToken=req.body.access_token;
  if(!refreshToken || !accessToken)
      return res.status(404).send("One of the token missing");
  await set_redis();
  await set_redis();
  res.send("ok")
};

module.exports.refresh_token = (req, res) => {

};

module.exports.fetch_details = (req, res) => {
  db.fetch_data("public","supplier","supplier_name address phone_no verified email rating working_hours createdAt updatedAt","email",req.params.email)
  .then(data=>res.send(data))
};

module.exports.update_details = (req, res) => {
  let updatedAt = moment().format("YYYY-MM-DD HH:MM:SS ZZ");
  let cols=req.body.cols+" updatedat",
      vals=[...req.body.vals, updatedAt]
  db.update_entry("public","supplier","email",[req.body.email],cols,vals).then(data=>res.send(data))
};

module.exports.registermenu = async (req, res) => {
  const id = gen(),
    created = moment();
   
   let supplier= await db.fetch_data("public","supplier","id","email",req.body.email);
   console.log(supplier)
   let s_id=supplier[0].id;
    
   db.insert("public", "products", " ", [
    id,
    req.body.product_name,
    req.body.product_price,
    req.body.product_desc,
    s_id,
    created,
    created,
  ]).then((data) => {
    if (data) res.send("product insert_successful");
    else res.send("error");
  });
};

module.exports.fetchmenu = (req, res) => {
  db.fetch_data("public","products","id product_name product_price description","s_id",req.params.sid)
  .then(data=>res.send(data))
};

module.exports.updatemenu = (req, res) => {
  let updatedAt = moment();
  let cols=req.body.cols+" updatedat",
      vals=[...req.body.vals, updatedAt]
  db.update_entry("public","products","id",[req.body.pid],cols,vals).then(data=>res.send(data))
};



