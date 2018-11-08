var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

router.post('/comment', function(req, res, next) {
    console.log("POST comment route");
    console.log(req.body);
    var newComment = new Comment(req.body);
    newComment.save(function(err, result) {
        if (err) { console.log("got error") }
        else {
            console.log("save worked");
            console.log(result);
            res.sendStatus(200);
        }
    })
    // res.sendStatus(200);
});

router.delete('/delete', function(req, res, next) {
    Comment.deleteMany({}, function() {
        console.log("removed!!");
    })
})

router.get('/search', function(req, res, next) {
    console.log("searching!!");
    console.log("this is req.body: ", req.query.str);
    Comment.find({Name: req.query.str}, function(err, commentList) {
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(commentList);
            res.json(commentList);
        }
    });
})

/* GET comments from database */
router.get('/comment', function(req, res, next) {
    console.log("In the GET route");
    Comment.find(function(err, commentList) { //Calls the find() method on your database
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(commentList);
            res.json(commentList); //Then send the comments
        }
    })
});

module.exports = router;
