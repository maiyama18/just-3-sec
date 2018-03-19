var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var getRanking = require('./getRanking');

var app = express();

var port = process.env.PORT || 3001;

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/result', function(req, res) {
  var result = req.body;
  console.log(result);
  res.send('hello')
});
app.get('/api/ranking', function(req, res) {
  var rankingArray = getRanking();
  res.send(rankingArray);
});

app.listen(port, function(err) {
  if (err) console.error(err)
  
  console.log(`listening on port ${port}`);
});