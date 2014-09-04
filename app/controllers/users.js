'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/new');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.logout = function(req, res){
  req.logout();
  req.flash('notice', 'You have successfully logged out of the system.');
  res.redirect('/');
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

exports.show = function(req, res){
  res.render('users/profile');
};

exports.edit = function(req, res){
  res.render('users/edit-profile');
};

exports.update = function(req, res){
  req.user.update(req.body, function(){
    req.flash('notice', 'You have updated your profile.');
    res.redirect('/profile');
  });
};
