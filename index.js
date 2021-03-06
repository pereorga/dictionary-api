const express = require("express");
const fs = require('fs');

const commonvoice_sentences = Object.assign(Object.create(null), JSON.parse(fs.readFileSync(__dirname + '/data/commonvoice_sentences.json')));
const commonvoice_voices = Object.assign(Object.create(null), JSON.parse(fs.readFileSync(__dirname + '/data/commonvoice_voices.json')));
const gdlc_words = Object.assign(Object.create(null), JSON.parse(fs.readFileSync(__dirname + '/data/gdlc_words.json')));
const diec_words = Object.assign(Object.create(null), JSON.parse(fs.readFileSync(__dirname + '/data/diec_words.json')));
const dcvb_words = Object.assign(Object.create(null), JSON.parse(fs.readFileSync(__dirname + '/data/dcvb_words.json')));

const app = express();
const port = 3000;


function commonvoice_getSentences(word) {

  let sentences = [];
  if (typeof commonvoice_sentences[word] === 'object') {
    sentences = commonvoice_sentences[word]
  }

  return sentences;
}

function commonvoice_getVoicesBySentence(sentence) {

  let voices = [];
  if (typeof commonvoice_voices[sentence] === 'object') {
    voices = commonvoice_voices[sentence]
  }

  return voices;
}

function commonvoice_getVoicesByWord(word) {

  let sentences = commonvoice_getSentences(word);
  let voices = Object.create(null);
  sentences.forEach(function(sentence) {
    if (sentence) {
      voices[sentence] = commonvoice_getVoicesBySentence(sentence);
    }
  });

  return voices;
}

function commonvoice_searchSentences(word) {

  let search_result = Object.create(null);
  for (let w in commonvoice_sentences) {
    if (w && w.indexOf(word) !== -1) {
      search_result[w] = commonvoice_sentences[w];
    }
  }
  return search_result;
}

function commonvoice_searchVoices(word) {

  let search_result = Object.create(null);
  for (let w in commonvoice_sentences) {
    if (w && w.indexOf(word) !== -1) {
      search_result[w] = Object.create(null);
      commonvoice_sentences[w].forEach(function(sentence) {
        if (sentence) {
          if (typeof search_result[w][sentence] !== 'object') {
            search_result[w][sentence] = Object.create(null);
          }
          search_result[w][sentence] = commonvoice_voices[sentence];
        }
      });
    }
  }

  return search_result;
}

function gdlc_getUrlsByWord(word) {

  let urls = [];
  if (typeof gdlc_words[word] === 'object') {
    gdlc_words[word].forEach(function(obj) {
      if (obj) {
        urls.push({title: obj.title, url: 'https://www.enciclopedia.cat/' + obj.id.toLowerCase() + '.xml'});
      }
    });
  }

  return urls;
}

function diec_getUrlsByWord(word) {

  let urls = [];
  if (typeof diec_words[word] === 'object') {
    diec_words[word].forEach(function(obj) {
      if (obj) {
        urls.push({title: obj.title, url: 'https://dlc.iec.cat/Results?DecEntradaText=' + word});
      }
    });
  }

  return urls;
}

function dcvb_getUrlsByWord(word) {

  let urls = [];

  // DCVB is case-insensitive unfortunately.
  let word_lc = word.toLowerCase();

  if (typeof dcvb_words[word_lc] === 'object') {
    dcvb_words[word_lc].forEach(function(obj) {
      if (obj) {
        urls.push({title: obj.title, url: 'https://dcvb.iec.cat/results.asp?word=' + word});
      }
    });
  }

  return urls;
}

function all_getUrlsByWord(word) {

  let urls = Object.create(null);
  urls['diec'] = diec_getUrlsByWord(word);
  urls['gdlc'] = gdlc_getUrlsByWord(word);
  urls['dcvb'] = dcvb_getUrlsByWord(word);
  urls['commonvoice'] = commonvoice_getVoicesByWord(word);

  return urls;
}

app.use(function(req, res, next) {
  res.setHeader('charset', 'utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Routes.
app.get('/commonvoice/getSentences/:word', function(req, res) {

  let sentences = commonvoice_getSentences(req.params.word);
  res.send({data: sentences});
});

app.get('/commonvoice/getVoicesBySentence/:sentence', function(req, res) {

  let voices = commonvoice_getVoicesBySentence(req.params.sentence);
  res.send({data: voices});
});

app.get('/commonvoice/getVoicesByWord/:word', function(req, res) {

  let voices = commonvoice_getVoicesByWord(req.params.word);
  res.send({data: voices});
});

app.get('/commonvoice/searchSentences/:word', function(req, res) {

  let sentences = commonvoice_searchSentences(req.params.word);
  res.send({data: sentences});
});

app.get('/commonvoice/searchVoices/:word', function(req, res) {

  let voices = commonvoice_searchVoices(req.params.word);
  res.send({data: voices});
});

app.get('/diec/getUrlsByWord/:word', function(req, res) {

  let urls = diec_getUrlsByWord(req.params.word);
  res.send({data: urls});
});

app.get('/gdlc/getUrlsByWord/:word', function(req, res) {

  let urls = gdlc_getUrlsByWord(req.params.word);
  res.send({data: urls});
});

app.get('/dcvb/getUrlsByWord/:word', function(req, res) {

  let urls = dcvb_getUrlsByWord(req.params.word);
  res.send({data: urls});
});

app.get('/all/getUrlsByWord/:word', function(req, res) {

  let urls = all_getUrlsByWord(req.params.word);
  res.send({data: urls});
});


app.listen(port, function () {

  console.log("Listening on port " + port + "...");
});
