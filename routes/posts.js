var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('mongodb://yagnesh:yagnesh@ds161039.mlab.com:61039/newbiedb');

/* For showing posts based on post._id. */
router.get('/show/:id', function(req, res, next) {
  //res.render('error' ,{ id : req.params.id });
  //console.log('coming here');
  var posts = db.get('posts');
     posts.findOne({ _id : req.params.id }, function(err, post){
    if(err) throw err
    //console.log('coming hre and value of post is');
    //console.log(post);
    res.render('post' , {
      posts : post
    })
  })
 });

//delete post based on _id
 router.get('/delete/:id', ensureAuthenticated, function(req, res, next) {
  //res.render('error' ,{ id : req.params.id });
  //console.log('coming here');
  var posts = db.get('posts');
  posts.findOneAndDelete({ _id : req.params.id }, function(err, post){
  if(err) throw err
    console.log('coming hre and value of post is');
    console.log(post);
    req.flash('success', 'Post has been deleted!');
    res.location('/');
    res.redirect('/');
  })
 });

//check if user logged in
 function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('error', 'Sorry buddy only admin can delete posts!');
  res.redirect('/login');
}


// edit post based on _id
 router.get('/edit/:id',  function(req, res, next) {
  //res.render('error' ,{ id : req.params.id });
  //console.log('coming here');
  var posts = db.get('posts');
  posts.findOne({ _id : req.params.id }, function(err, post){
  if(err) throw err
    console.log('coming hre and value of post is');
    console.log(post);
    res.render('addposts', { posts : post });
  })
 });


router.get('/category/:category', function(req, res, next) {
  //res.render('error' ,{ id : req.params.id });
  //console.log('coming here');
  var posts = db.get('posts');
    posts.find({ category : req.params.category }, function(err, post){
    if(err) throw err
    //console.log('coming hre and value of category is');
    //console.log(post);
    res.render('index' , {
      posts : post,
      title : req.params.category
    })
  })
 });


module.exports = router;
