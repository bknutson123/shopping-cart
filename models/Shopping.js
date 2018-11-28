var mongoose = require('mongoose');

var ShoppingSchema = new mongoose.Schema({
  Name: String,
  price: {type: Number, default:0},
  Url: String,
  ordered: {type: Number, default:0}
});

ShoppingSchema.methods.Uporder = function(cb) {
  this.ordered += 1;
  this.save(cb);
};

mongoose.model('Shopping',ShoppingSchema);