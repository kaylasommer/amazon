'use strict';

function Product(){
}

Object.defineProperty(Product, 'collection', {
  get: function(){return global.mongodb.collection('products');}
});

Product.all = function(cb){
  Product.collection.find().toArray(cb);
};

module.exports = Product;
