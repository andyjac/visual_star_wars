require('dotenv').load();

var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use('/api', require('./controllers'));

app.all('*', function(req, res) {
  res.status(404).json({msg: 'page not found'});
});

app.listen(PORT, function() {
  console.log('listening on port ' + PORT + '...');
});
