var express = require( 'express' );
var app = express();
var path = require('path');
var bodyParser = require( 'body-parser' );
var urlencodedparser = bodyParser.urlencoded( {extended: false} );
var portDecision = process.env.PORT || 3001;
var allTheJokes = [
  {
    whoseJoke: "Huck",
    jokeQuestion: "What's the difference between roast beef and pea soup?",
    punchLine: "Anyone can roast beef."
  },
  {
    whoseJoke: "Millie",
    jokeQuestion: "What do you call a pile of cats?",
    punchLine: "A meowntain!"
  },
  {
    whoseJoke: "dEv",
    jokeQuestion: "Why should you not play cards in the forest?",
    punchLine: "Too many Cheetahs"
  },
  {
    whoseJoke: "Rox",
    jokeQuestion: "What do you get when you mix sulfur, tungsten, and silver?",
    punchLine: "SWAG"
  }
];

app.listen( portDecision, function(){
  console.log('server is listening on port 3001');
});

app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile( path.resolve('public/index.html'));
});

app.post('/loadJokes', urlencodedparser, function(req, res){
  console.log("post loadJoke hit", req.body);
  res.send(allTheJokes);


});

app.post('/addJoke', urlencodedparser, function(req, res){
  console.log("post addJoke hit", req.body);
  allTheJokes.push(req.body);
  console.log(allTheJokes);
  res.send(allTheJokes);


});



app.use(express.static('public'));
