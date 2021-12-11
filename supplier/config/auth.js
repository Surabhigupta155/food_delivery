const passport = require('passport');
var url = require('url');
var JsonStrategy = require('passport-json').Strategy;
const db = require("../db/db");
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const shasum=require('crypto-js/sha256');


const error_debug = require("debug")("app:auth:error");

require('dotenv').config('../../.env') 


// passport.use(
//   'signup',
//   new JsonStrategy({
//       usernameProp: 'email',
//       passwordProp: 'password'
//     },
//     async (email, password, done) => {
//       try {
//         const user={email:email, password:password}
//         return done(null, user);
//         //include part if user exists then send other error code
//       } catch (error) {
//         console.log(`func passport.use(), Exception in Sign up, 
//           Email Id : ${email}, Error is : ` + error)
//         done(error);
//       }
//     }
//   )
// );
      

passport.use(
  new JsonStrategy(
    {
      usernameProp: 'email',
      passwordProp: 'password'
    },
    async (email, password, done) => {
      try {
        console.log("+++++++++++++++++++++++")
        const client = await db.fetch_data(
          "public",
          "supplier",
          "email password",
          "email",
            email,
          1
        );

        if (client.length==0) {
          return done(null, false, {status:400, message: 'User not found' });
        }
          
        let dbpswd=client[0].password.toString()
        var d=shasum(password)
    
        
        if (!(dbpswd==d)) {
          return done(null, false, { status:403,message: 'Wrong Password' });
        }
        return done(null, client[0], { message: 'Logged in Successfully' });

      }catch(error){
        console.log("+++++++++++++++++++++++")
        console.log(`func passport.use(), Exception in User Login, 
          Email Id: ${email}, Error is : ` + error)

        error_debug(`func passport.use(), Exception in User Login, Email Id : ${email}`)
        return done(error);
      }
    }
  )
);


passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      passReqToCallback:true,
    },
    async (req,token, done) => {
      try {
        req.body.email=token.email
        req.JWT = token
        return done(null, token.user);
      }catch (error){
        // error_debug(`func passport.use(), 
        // Exception in User Login, Email Id : ${email}`)
        console.log(`func passport.use() JWTstrategy, Adding orgid, 
          Error is : ` + error)
        done(error);
      }
    }
  )
);



exports.auth=(req, res, next)=>{

  passport.authenticate('jwt',
    {session:false}, function(err, payload, info){
      if (err){
        return next(err);
      }
      console.log("auth.auth => " + (req.originalUrl))

      if (info && info.name == "JsonWebTokenError"){
        // Invalid token 
        res.status(401).send("Unauthorised User");
        return
      }else if (info && info.name == "TokenExpiredError"){
        // Token expired Error
        console.log("RToken exzpired ....")
        res.status(401).send("Token Expired"); // .status(422)
        return 
      }else if (info && info.name == "Error"){
        // When No Auth
        console.log(info)
        res.redirect("/traqez/f/401")
        // res.status(401).send("Unauthorised User, No Token sent");
        return
      }else{
        console.log("going to next ...")
        return next();
      }
  })(req, res, next)
}
