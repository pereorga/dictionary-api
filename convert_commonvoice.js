const csv = require('csv-parser')
const fs = require('fs')
const results = [];

var dict = {};
var paraules = [];

const uncapitalize = function (s) {
  if (typeof s !== 'string') {
    return '';
  }
  return s.trim().charAt(0).toLowerCase() + s.slice(1);
}

fs.createReadStream('source/commonvoice/validated.tsv')
  .pipe(csv({ separator: '\t' }))
  .on('data', (data) => results.push(data))
  .on('end', () => {

    results.forEach(function(fila) {

      // Clean input file from uneeded stuff.
      delete fila['client_id'];
      delete fila['age'];
      if (fila['accent'] === 'other') {
        fila['accent'] = '';
      }
      if (fila['gender'] === 'other') {
        fila['gender'] = '';
      }

      var paraules = fila.sentence.split(/[ .:;?!~,`"'«»&|()<>{}\[\]\t\r\n/\\]+/);

      var start_sentence = true;
      paraules.forEach(function(paraula) {
        if (paraula && paraula.length > 1) {

          if (start_sentence) {

            start_sentence = false;

            // TODO: Do not try to uncapitalize if word exists in LanguageTool?
            var paraula = uncapitalize(paraula);
          }

          if (typeof dict[paraula] !== 'object') {
            dict[paraula] = [];
          }

          var existing = false;
          var replaced = false;
          for (var i  = 0; i < dict[paraula].length && !replaced; i++) {
            if (dict[paraula][i].gender === fila.gender && dict[paraula][i].accent === fila.accent) {
              existing = true;

              if (dict[paraula][i].up_votes - dict[paraula][i].down_votes < fila.up_votes - fila.down_votes) {

                // Better sentence found for that gender and accent.
                dict[paraula][i] = fila;
                replaced = true;
              }
            }
          }
          if (!existing) {

            // First occurrence for this gender and accent.
            dict[paraula].push(fila);
          }
        }

      })
    });

    // Remove votes.
    for (var property in dict) {
      if (dict.hasOwnProperty(property)) {
        for (var i  = 0; i < dict[property].length; i++) {

          //delete dict[property][i]['up_votes'];
          //delete dict[property][i]['down_votes'];
        }
      }
    }

    fs.writeFileSync("data/commonvoice.json", JSON.stringify(dict));
    //fs.writeFileSync("commonvoice.json", JSON.stringify(dict, null, " "));
  });
