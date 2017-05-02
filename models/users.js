var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

//mongoose.connect('mongodb://localhost/nodeauth');
mongoose.connect('mongodb://yagnesh:yagnesh@ds161039.mlab.com:61039/newbiedb');

var db = mongoose.connection;

//Schema
var UserSchema = new Schema({
    username : {
        type : String,
        unique : true,
        index : true
    },
    password : {
        type : String,
        bcrypt : true,
        required : true
    },
    email : {
        type : String,
        unique : true
        
    },
    name : {
        type : String,
        unique : true
    },
    profileImage : {
        type : String
    }
});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser,callback){
    bcrypt.hash(newUser.password, 10, function(err, hash){
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
    });
    
}

module.exports.getUserByUsername = function(username , callback){
    var query = { username : username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id , callback){
    var query = { _id : id};
    User.findById(id, callback);
}

module.exports.validatePassword = function(userpass, dbHashPass, callback){
    bcrypt.compare(userpass, dbHashPass ,function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    })

}