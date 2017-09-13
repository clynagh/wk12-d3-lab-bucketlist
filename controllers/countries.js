var express = require('express');
var countryRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;

var db;
  //get animals for DB send back to client

MongoClient.connect('mongodb://localhost:27017/world', function(err,database){
  if(err) return;
  db = database;
})

//countries INDEX

countryRouter.get('/', function(req, res){
  db.collection('world').find().toArray(function(err,results){
    if(err) console.log("oops" + err);
    res.json(results);
  })
})

//show

//edit

//update

// create
countryRouter.post('/', function(req, res){
  console.log(req.body)
  db.collection('world').insert({
    name: req.body.name,
    });
  db.collection('world').find().toArray(function(err,results){
    if(err) console.log("oops" + err);
    res.json(results);
  })
})
//delete

module.exports = countryRouter;