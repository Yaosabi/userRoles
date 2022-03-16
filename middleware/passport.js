const passport = require('passport')
const {Strategy} = require('passport-local').Strategy;
const {User, Role, Permission} = require('../models');
const md5 = require('md5')
var logger = require('morgan');
const session = require('express-session');
var indexRouter = require('./routes/index');

async function verifyUser(username, password, done) {
    //fetch from database
    const user =  await User.findOne({
        where:{
            email: username,
            password: md5(password)
        }
    });
    //if neither match
    if(!user) {
        return done(null, false, {message: 'Incorrect email or password'})
    }
    //passed auth
    return done(false, {
        id: user.id,
    });
}

passport.use(
    new Strategy(
        {
            usernameField:'email',
            passwordField:'password'
        },
        verifyUser
    )
);

passport.serializeUser(function(req,res){
    process.nextTick(function (){
        done(null, {id: user.id});
    });
});



passport.deserializeUser(async function(user,done){
    const userModel = await User.findByPk(user.id,{
        include: [
            {
                model: Role,
                as: 'role',
                include: [
                    {
                        model: Permisson,
                        as: 'permissons'
                    }
                ],
            }
        ]
    });
    process.nextTick(function(){
        return done(null, userModel);
    });
});

module.exports.passport = passport;