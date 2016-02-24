var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.send('Hello there');
});

var port = 3000;
app.listen(port, function() {
  console.log('App running on port ' + port);
});