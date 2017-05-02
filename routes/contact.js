var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var db = require('monk')('mongodb://yagnesh:yagnesh@ds161039.mlab.com:61039/newbiedb');

router.post('/add', function(req, res, next){

    var user = req.body.username;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;
    console.log(`usernme is ${user}`);

    req.checkBody('user', 'Name cannot be empty!').isEmpty();
    req.checkBody('email', 'Email cannot be empty!' ).notEmpty();
    req.checkBody('email', 'Email is not valid!' ).isEmail();
    req.checkBody('phone', 'Phone number is not valid!' ).isNumeric();
    req.checkBody('message', 'Message cannot be empty!' ).notEmpty();

    var errors = req.validationErrors();
    console.log('error is');
    console.log(errors);

    if(errors){
        res.render('contact', {
            errors : errors,
            user : user,
            email : email,
            phone : phone,
            message : message
        })
    }
    else{
         var contacts = db.get('contacts');
         contacts.insert({ user : user, email : email, phone : phone, message : message}, function(err, contact){
             if(err) throw err;
             req.flash('success', 'Your message is successfully submitted!');
             res.location('/');
             res.redirect('/');
         });
    }
});

module.exports = router;