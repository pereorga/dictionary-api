# Dictionary API
==============

## Installation
-----

```
npm install
node index.js
```

## Examples

### CommonVoice

```
$ curl --silent http://localhost:3000/commonvoice/getSentences/cogombre | jq
{
  "data": [
    "El seu parent, el cogombre, amb aquelles formes fàl·liques tan suggerents és una altra cosa."
  ]
}
```

```
$ curl --silent http://localhost:3000/commonvoice/getVoicesBySentence/El%20seu%20parent,%20el%20cogombre,%20amb%20aquelles%20formes%20f%C3%A0l%C2%B7liques%20tan%20suggerents%20%C3%A9s%20una%20altra%20cosa. | jq
{
  "data": [
    {
      "path": "common_voice_ca_17483356.mp3",
      "gender": "female",
      "accent": "central"
    }
  ]
}
```

```
$ curl --silent http://localhost:3000/commonvoice/getVoicesByWord/cogombre | jq
{
  "data": {
    "El seu parent, el cogombre, amb aquelles formes fàl·liques tan suggerents és una altra cosa.": [
      {
        "path": "common_voice_ca_17483356.mp3",
        "gender": "female",
        "accent": "central"
      }
    ]
  }
}
```

```
$ curl --silent http://localhost:3000/commonvoice/searchSentences/perdre | jq
{
  "data": {
    "perdre": [
      "A part que això seria indigne de la família, els faria perdre el negoci!",
      "En aquest cas sempre tindrem les de perdre.",
      "La major part d'ells tenen poc a perdre en els aldarulls civils.",
      "En Màxim va perdre bous i esquelles, fent política.",
      "A més, el taverner pot perdre la seva llicència.",
      "No podem perdre temps.",
      "Els núvols, lleugers ja d'equipatge, volaven de pressa fins a perdre's.",
      "Es va perdre per la muntanya i van haver de cridar els Mossos.",
      "Qui es posa a jugar, tant pot perdre com guanyar.",
      "Per no perdre la vedella, penja-li al coll una esquella."
    ],
    "perdre-les": [
      "Aquestes dues realitats faríem molt bé de no perdre-les de vista."
    ],
    "perdrem": [
      "Afanya't o perdrem l'avió.",
      "Si per alguna raó hem de desinstal·lar el pedaç, perdrem també aquestes eines.",
      "La cura va bé, però l'ull el perdrem."
    ],
    "perdre-ho": [
      "Convé no perdre-ho de vista."
    ],
    "besperdre": [
      "Més val perdre que besperdre."
    ]
  }
}
```

```
$ curl --silent http://localhost:3000/commonvoice/searchVoices/perdonar | jq
{
  "data": {
    "perdonar": {
      "Hi ha ferides que la natura no pot perdonar; deixaria de ser natura si ho fes.": [
        {
          "path": "common_voice_ca_17539985.mp3",
          "gender": "female",
          "accent": "central"
        },
        {
          "path": "common_voice_ca_17492296.mp3",
          "gender": "male",
          "accent": "central"
        }
      ]
    },
    "perdonaríem": {
      "Podries tindre una caiguda mortal i no ens ho perdonaríem mai.": [
        {
          "path": "common_voice_ca_17682061.mp3",
          "gender": "",
          "accent": ""
        },
        {
          "path": "common_voice_ca_17513194.mp3",
          "gender": "male",
          "accent": "central"
        }
      ]
    }
  }
}
```
