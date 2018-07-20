// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var shortid = require('shortid');

var urlencodedParser = bodyParser.urlencoded({extended: false});

//db stuff
mongoose.connect(process.env.DB, { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
  /*
  _id: {
    'type': String,
    'default': shortid.generate
  },
  */
  username: String
});
var User = mongoose.model('User', userSchema);

var exerciseSchema = new mongoose.Schema({
  userid: String,
  description: String,
  duration: Number,
  date: Date
});
var Exercise = mongoose.model('Exercise', exerciseSchema);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/exercise/log', function(req, res) {
  res.send("This will be the endpoint for the exercise log.");
})

app.post('/api/exercise/new-user', urlencodedParser, function(req, res, next) {
  var username = req.body.username;
  //does the user already exist?
  User.find({username: username,}, function(err, data) {
    if (err) throw err;
    if (data.length < 1) { //user does not exist
      var newUser = new User({username: username,}).save().then(function(data) {
        res.json({username: data.username, id: data._id});
      });
    } else { //username taken
      res.send("this user already exists!");
    }
  });
});

//{"username":"test","id":"5b51beb1caddbe12dadef7c2"}
app.post('/api/exercise/add', urlencodedParser, function(req, res) {
  //search for user
  User.findById(req.body.userid, function(err, person) {
    if (err) {
      res.send("User ID does not exist.");
    } else {
      //parse date
      var date;
      if (req.body.date === '') {
        date = new Date(); //date not given, default to now
      } else { 
        date = new Date(req.body.date); //date given, parse
      }
      //create exercise
      var newExercise = new Exercise({
        userid: req.body.userid,
        description: req.body.description,
        duration: parseInt(req.body.duration),
        date: date
      }).save().then(function(data) {
        res.json({
          username: person.username,
          description: data.description,
          duration: data.duration,
          id: person._id,
          date: data.date.toDateString()
        });
      });
    }
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
