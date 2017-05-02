var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var db = require('monk')('mongodb://yagnesh:yagnesh@ds161039.mlab.com:61039/newbiedb');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

var uploads = multer({ storage: storage })
//var uploads = multer({dest: './uploads'});


router.post('/add/:date', uploads.single('profileimg'), function(req, res, next) {

  var title = req.body.title;
  var subtitle = req.body.subtitle;
  var category = req.body.category;
  var newcategory = req.body.newcategory;
  var content = req.body.content;
  var author = req.body.author;
  var clientdate= req.params.date;
  //console.log(' new category is');
  //console.log(newcategory);

if(req.file){
  //console.log("Uploading..");
  //console.log(req.file);
  var profileImageName = req.file.originalname;

}
else{
   //console.log('profle picture not uplaoded!');
   var profileImageName = 'no-image';
}

//Form Validations
req.checkBody('title','Title field is mandatory').notEmpty();
req.checkBody('subtitle','Sub-title filed id mandatory').notEmpty();
req.checkBody('content','Content field is mandatory').notEmpty();
req.checkBody('author','Author field is mandatory').notEmpty()


var errors = req.validationErrors();

if(errors){
  console.log('errros are there!!');
  console.log(errors);
  res.render('addposts',{ 
    errors : errors,
    title : title,
    subtitle : subtitle,
    content : content,
    author : author,
    date : clientdate,
    title : 'Create a new Post!'
    
  });
}else{
  
  if(!category){
    var categories = db.get('categories');
    categories.insert({ category : newcategory });
    category = newcategory;
  }
  var posts = db.get('posts');
  posts.insert({title : title , subtitle : subtitle, category : category, content : content, author: author, image : profileImageName, date : new Date()}, function(err, post){
      if(err) throw err;
      req.flash('success','Your post is submitted!');
      res.location('/');
      res.redirect('/');
  });
}
  //success message
  
});


module.exports = router;