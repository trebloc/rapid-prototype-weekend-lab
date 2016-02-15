// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/


/*
 * HTML Endpoints
 */

// Render to the Main Page
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/foods', function foodsIndex(req, res) {
  db.Food.find({}, function(err, foods) {
    res.json(foods);
  });
});

// Read of the Suggestion Page of new Foods
app.get('/api/foods', function foodIndex(req, res) {
  db.Food.find({}, function(err, food) {
    // console.log(food);
    res.json(food);
  });
});

// Posting of the new Food
app.post('/api/foods', function foodCreate(req, res) {
  console.log("Create New Data");
  console.log('body', req.body);
  db.Suggest.create(req.body, function(err, food) {
    if (err) { console.log('error', err); }
    console.log(food);
    res.json(food);
  });
});

// Delete of the Suggested New Food
app.delete('/api/foods/:id', function foodIndex(req, res) {
  console.log('deleting id:', req.params.id);
  db.Suggest.remove({_id: req.params.id}, function(err, food) {
    if (err) {console.log('error', err); }
    console.log('food deleted: ' , req.params.id , food.Food);
    res.status(200).send();
  });
});

// app.listen(process.env.PORT || 3000)
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});