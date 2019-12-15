const express = require("express");
const fs = require('fs');

const port = 3000;
const commonvoice_sentences = JSON.parse(fs.readFileSync(__dirname + '/data/commonvoice_sentences.json'));
const commonvoice_voices = JSON.parse(fs.readFileSync(__dirname + '/data/commonvoice_voices.json'));
const app = express();

let result = {
  data: []
};

app.get('/commonvoice/getSentences/:word', function(req, res) {

  if (typeof commonvoice_sentences[req.params.word] === 'object') {
    result = {
      data: commonvoice_sentences[req.params.word]
    };
  }
  res.send(result);
});

app.get('/commonvoice/getVoicesBySentence/:sentence', function(req, res) {

  if (typeof commonvoice_voices[req.params.sentence] === 'object') {
    result = {
      data: commonvoice_voices[req.params.sentence]
    };
  }
  res.send(result);
});

app.get('/commonvoice/getVoicesByWord/:word', function(req, res) {

  if (typeof commonvoice_sentences[req.params.word] === 'object') {

    let voices_by_word = {};
    commonvoice_sentences[req.params.word].forEach(function(sentence) {
      if (sentence) {
        voices_by_word[sentence] = commonvoice_voices[sentence];
      }
    })
    result = {
      data: voices_by_word
    };
  }

  res.send(result);
});

app.get('/commonvoice/searchSentences/:word', function(req, res) {

  let search_result = {};
  for (let word in commonvoice_sentences) {
    if (word.indexOf(req.params.word) !== -1) {
      search_result[word] = commonvoice_sentences[word];
    }
  }
  result = {
    data: search_result
  };
  res.send(result);
});

app.get('/commonvoice/searchVoices/:word', function(req, res) {

  let search_result = {};
  for (let word in commonvoice_sentences) {
    if (word.indexOf(req.params.word) !== -1) {
      search_result[word] = {};

      commonvoice_sentences[word].forEach(function(sentence) {
        if (sentence) {
          if (typeof search_result[word][sentence] !== 'object') {
            search_result[word][sentence] = {};
          }
          search_result[word][sentence] = commonvoice_voices[sentence];
        }
      });
    }
  }
  result = {
    data: search_result
  };
  res.send(result);
});

app.listen(port, function () {
  console.log("Listening on port " + port + "...");
});
