const express = require("express");
const fs = require('fs');

const port = 3000;
const commonvoice = JSON.parse(fs.readFileSync(__dirname + '/data/commonvoice.json'));
const app = express();

let result = {
  data: []
};

app.get('/commonvoice/:word', function(req, res) {

  if (typeof commonvoice[req.params.word] === 'object') {
    result = {
      data: commonvoice[req.params.word]
    };
  }
  res.send(result);
});

app.listen(port, function () {
  console.log("Listening on port " + port + "...");
});
