'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb'),
    _      = require('underscore-contrib');

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.prototype.update = function(o, cb){
  this.email = o.email;
  this.age = o.age * 1;
  this.photo = o.photo;
  User.collection.save(this, cb);
};

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, function(err, obj){
    var user = Object.create(User.prototype);
    user = _.extend(user, obj);
    cb(err, user);
  });
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    o.type = 'local';
    User.collection.save(o, cb);
  });
};

User.localAuthenticate = function(email, password, cb){
  User.collection.findOne({email:email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};

User.twitterAuthenticate = function(token, secret, twitter, cb){
  User.collection.findOne({twitterId:twitter.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {twitterId:twitter.id, username: twitter.username, displayName: twitter.displayName, type:'twitter'};
    User.collection.save(user, cb);
  });
};

User.githubAuthenticate = function(token, secret, github, cb){
  User.collection.findOne({githubId:github.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {githubId:github.id, username: github.username, displayName: github.displayName, type:'github'};
    User.collection.save(user, cb);
  });
};

User.googleAuthenticate = function(accessToken, refreshToken, google, cb){
  User.collection.findOne({googleId:google.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {googleId:google.id, displayName: google.displayName, type:'google'};
    User.collection.save(user, cb);
  });
};

User.facebookAuthenticate = function(token, secret, facebook, cb){
  User.collection.findOne({facebookId:facebook.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {facebookId:facebook.id, displayName: facebook.displayName, type:'facebook'};
    User.collection.save(user, cb);
  });
};

User.instagramAuthenticate = function(token, secret, instagram, cb){
  User.collection.findOne({instagramId:instagram.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {instagramId:instagram.id, displayName: instagram.displayName, username: instagram.username, type:'instagram'};
    User.collection.save(user, cb);
  });
};
module.exports = User;

