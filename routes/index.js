var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var db = require('monk')('mongodb://yagnesh:yagnesh@ds161039.mlab.com:61039/newbiedb');

/* GET home page. */
router.get('/', function(req, res, next) {
  //var db = req.db;
  var posts = db.get('posts');//name of collection
  posts.find({}, { limit : 10, sort : { date : -1 } }, function(err, posts){
    if(err) return err;
    res.render('index', {
      posts : posts ,
      title : "Blog"
    })
  });
});

//admin login

router.get('/login', function(req, res, next){
  res.render('login', {title : 'Admin login'});
})

router.get('/addposts', function(req, res, next) {
  var categories = db.get('categories');
  categories.find({}, { sort : { category : 1 } }, function(err, category){
    if(err) return err;
    //console.log(category.length)
  res.render('addposts', { title: 'Create New Post!' , categories : category} );
});
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});

module.exports = router;
