'use strict';

var Mongo = require('mongodb');

function Product(){
}

Object.defineProperty(Product, 'collection', {
  get: function(){return global.mongodb.collection('products');}
});

Product.all = function(cb){
  Product.collection.find().toArray(cb);
};

Product.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Product.collection.findOne({_id:_id}, cb);
};

module.exports = Product;
