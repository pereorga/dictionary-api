const csv = require('csv-parser')
const fs = require('fs')
const results = [];

var paraules = {};
var frases = {};

const languagetool_text = fs.readFileSync(__dirname + '/source/languagetool/majuscules.txt', 'utf8');
const majuscules = new Set(languagetool_text.split("\n"));

const uncapitalize = function (s) {
  if (typeof s !== 'string') {
    return '';
  }
  return s.trim().charAt(0).toLowerCase() + s.slice(1);
}

fs.createReadStream(__dirname + '/source/commonvoice/validated.tsv')
  .pipe(csv({ separator: '\t' }))
  .on('data', (data) => results.push(data))
  .on('end', () => {

    results.forEach(function(fila) {

      var frase = fila.sentence;

      // Clean input file from uneeded stuff.
      delete fila['sentence'];
      delete fila['client_id'];
      delete fila['age'];
      if (fila['accent'] === 'other') {
        fila['accent'] = '';
      }
      if (fila['gender'] === 'other') {
        fila['gender'] = '';
      }

      var mots = frase.split(/[ .:;?!~,`"'«»&|()<>{}\[\]\t\r\n/\\]+/);

      var start_sentence = true;
      mots.forEach(function(paraula) {
        if (paraula && paraula.length > 1) {

          if (start_sentence) {

            start_sentence = false;

            // Uncapitalize word if does not exist in LanguageTool.
            if (!majuscules.has(paraula)) {
              paraula = uncapitalize(paraula);
            }
          }

          if (typeof paraules[paraula] !== 'object') {
            paraules[paraula] = [];
          }

          // Keep only 10 sentences per word.
          if (!paraules[paraula].includes(frase)) {
            if (paraules[paraula].length < 10) {
              paraules[paraula].push(frase);
            }
            //else {
            //  paraules[paraula][Math.floor(Math.random() * paraules[paraula].length)] = frase;
            //}
          }

          // Store sentences.
          if (typeof frases[frase] !== 'object') {
            frases[frase] = [];

          }
          var existing = false;
          var replaced = false;
          for (var i = 0; i < frases[frase].length && !replaced; i++) {
            if (frases[frase][i].gender === fila.gender && frases[frase][i].accent === fila.accent) {
              existing = true;

              if (frases[frase][i].up_votes - frases[frase][i].down_votes < fila.up_votes - fila.down_votes) {

                // Better sentence found for that gender and accent.
                frases[frase][i] = fila;
                replaced = true;
              }
            }
          }
          if (!existing) {

            // First occurrence for this gender and accent.
            delete fila['sentence'];
            frases[frase][i] = fila;
          }
        }
      })
    });

    // Remove votes.
    for (var property in frases) {
      if (frases.hasOwnProperty(property)) {
        for (var i  = 0; i < frases[property].length; i++) {

          delete frases[property][i]['up_votes'];
          delete frases[property][i]['down_votes'];
        }
      }
    }

    //fs.writeFileSync(__dirname + "/data/commonvoice_voices.json", JSON.stringify(paraules));
    //fs.writeFileSync(__dirname + "/data/commonvoice_sentences.json", JSON.stringify(frases));
    fs.writeFileSync(__dirname + "/data/commonvoice_voices.json", JSON.stringify(frases, null, " "));
    fs.writeFileSync(__dirname + "/data/commonvoice_sentences.json", JSON.stringify(paraules, null, " "));
  });
