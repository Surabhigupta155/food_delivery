const passportJwT = require("passport-jwt");
const JwTStrategy = passportJwT.Strategy;
const ExtractJwT = passportJwT.ExtractJwt;

const { Users } = require('../models')

module.exports = function(passport){
    console.log('yes');
    passport.use(
        new JwTStrategy(
            {
                secretOrKey:process.env.ACCESS_TOKEN_SECRET,
                jwtFromRequest: ExtractJwT.fromAuthHeaderAsBearerToken()
            },
            function(jwt_payload, next){
                console.log(jwt_payload);
                Users.findOne({ where: { phone_no: jwt_payload.phone_number } }, function(err, user){
                    if(err){
                        return next(err, false);
                    }
                    if(user){
                        next(null, user);
                    }
                    else{
                        next(null, false);
                    }
                })
            }
        )
    )
}