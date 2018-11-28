var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Shopping = mongoose.model('Shopping');

router.param('item', function(req, res, next, id) {
  var query = Shopping.findById(id);
  query.exec(function (err, item){
    if (err) { return next(err); }
    if (!item) { return next(new Error("can't find item")); }
    req.item = item;
    return next();
  });
});

router.get('/shopping/:item',function(req,res) {
  res.json(req.item);
});

router.put('/shopping/:item/Uporder', function(req, res, next) {
  console.log("Put Route: "+req.item);
  req.item.Uporder(function(err, item){
    if (err) { return next(err); }
    res.json(item);
  });
});

router.delete('/shopping/:item',function(req,res) {
  req.item.remove();
  res.sendStatus(200);
});

router.get('/shopping', function(req, res, next) {
  console.log("Get Route");
  Shopping.find(function(err, store){
    if(err){ console.log("Error"); return next(err); }
    res.json(store);
  console.log("res.json Get Route");
  });
  console.log("returning Get Route");
});

router.post('/shopping', function(req, res, next) {
  console.log("Post Route");
  var item = new Shopping(req.body);
  console.log(item);
  item.save(function(err, item){
		console.log("Error "+err);
		if(err){  return next(err); }
    console.log("Post Route before json");
		res.json(item);
	});
});

module.exports = router;