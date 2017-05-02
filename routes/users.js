var express = require('express');
var router = express.Router();
//var db = require('monk')('mongodb://yagnesh:yagnesh@ds161039.mlab.com:61039/newbiedb');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/users')



//passport sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//passport & localStrategy
passport.use(new localStrategy({ passReqToCallback: true },
  function(req, username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        //console.log('Username not found!!');
        return done(null , false);
      }
    User.validatePassword(password,  user.password, function(err, isMatch){
      if(err) throw err;
      if(isMatch){
        console.log('Authentication successfull');
        return done(null,user);
      }
      else{
         console.log('invalid password');
         return done(null, false);
      }
    })
  });
  }
 ));
      
   
//login
router.post('/login', passport.authenticate('local', {
  successRedirect : '/',
  failureFlash : 'Invalid Username/Password',
  failureRedirect : '/login',
  successFlash : 'You have logged in!',

}), function(req, res){
  console.log('Authentication successfull!');
  req.flash('success','You are logged in!');
  req.flash('user', username);
  //var username = encodeURIComponent(req.body.username);
  //res.redirect('/');

});

//logout
router.get('/logout', function(req, res, next) {
  req.logOut();
  req.flash('success', 'You have logged out!');
  res.redirect('/');
  //res.render('login',{ title:'login' });
});

module.exports = router;