// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var shortid = require('shortid');

var urlencodedParser = bodyParser.urlencoded({extended: false});

//db stuff
mongoose.connect(process.env.DB, { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
  _id: {
    'type': String,
    'default': shortid.generate
  },
  username: String
});
var User = mongoose.model('User', userSchema);

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
  
  var username = Object.keys(req.body)[0];
  //does the user already exist?
  User.find({username: username}, function(err, data) {
    if (err) throw err;
    if (data.length < 1) { //user does not exist
      var newUser = new User({username: username}).save().then(function(data) {
        console.log("saved");
        res.json(data);
      });
    } else { //username taken
      console.log("this user already exists!");
      res.send("this user already exists!");
    }
  });
  
});

app.get('/api/exercise/new-user', function(req, res) {
  console.log("test get request");
});

app.post('/api/exercise/add', function(req, res) {
  console.log("This will be the endpoint for the exercise logging route");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
