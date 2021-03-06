# Dictionary API

## Installation

```
npm install
node index.js
```

## Examples

### Get results for a word in all sources.

```
$ curl --silent http://localhost:3000/all/getUrlsByWord/genial | jq
{
  "data": {
    "diec": [
      {
        "title": "<span class=\"title\">genial </span>",
        "url": "https://dlc.iec.cat/Results?DecEntradaText=genial"
      }
    ],
    "gdlc": [
      {
        "title": "<span type=\"DIEC_2nd_ed\" class=\"ptr\" title>&#x25A0;</span> genial",
        "url": "https://www.enciclopedia.cat/ec-gdlc-e00069453.xml"
      }
    ],
    "dcvb": [
      {
        "title": "genial",
        "url": "https://dcvb.iec.cat/results.asp?word=genial"
      }
    ],
    "commonvoice": {
      "Em sembla genial que l'hagis coneguda a Tinder!": [
        {
          "path": "common_voice_ca_17852717.mp3",
          "gender": "",
          "accent": ""
        },
        {
          "path": "common_voice_ca_17944699.mp3",
          "gender": "female",
          "accent": "central"
        },
        {
          "path": "common_voice_ca_18084960.mp3",
          "gender": "male",
          "accent": "central"
        },
        {
          "path": "common_voice_ca_18013966.mp3",
          "gender": "",
          "accent": "central"
        }
      ],
      "Genial!": [
        {
          "path": "common_voice_ca_17647455.mp3",
          "gender": "female",
          "accent": "central"
        }
      ],
      "Genial.": [
        {
          "path": "common_voice_ca_17491551.mp3",
          "gender": "female",
          "accent": "northwestern"
        },
        {
          "path": "common_voice_ca_17584039.mp3",
          "gender": "female",
          "accent": "central"
        }
      ]
    }
  }
}
```

### Diccionari de la llengua catalana de l'IEC (DIEC)

```
$ curl --silent http://localhost:3000/diec/getUrlsByWord/exemple | jq
{
  "data": [
    {
      "title": "<span class=\"title\">exemple </span>",
      "url": "https://dlc.iec.cat/Results?DecEntradaText=exemple"
    }
  ]
}
```

```
$ curl --silent http://localhost:3000/diec/getUrlsByWord/motinexistent | jq
{
  "data": []
}
```

### Gran Diccionari de la Llengua Catalana (GDLC)

```
$ curl --silent http://localhost:3000/gdlc/getUrlsByWord/exemple | jq
{
  "data": [
    {
      "title": "<span type=\"DIEC_2nd_ed\" class=\"ptr\" title>&#x25A0;</span> exemple",
      "url": "https://www.enciclopedia.cat/ec-gdlc-e00060886.xml"
    }
  ]
}
```

```
$ curl --silent http://localhost:3000/gdlc/getUrlsByWord/fer | jq
{
  "data": [
    {
      "title": "<span type=\"DIEC_2nd_ed\" class=\"ptr\" title>&#x25A0;</span> fer <sup class=\"homograph\">1</sup>",
      "url": "https://www.enciclopedia.cat/ec-gdlc-e00063208.xml"
    },
    {
      "title": "fer <sup class=\"homograph\">2</sup>",
      "url": "https://www.enciclopedia.cat/ec-gdlc-e00165112.xml"
    },
    {
      "title": "<span type=\"DIEC_2nd_ed\" class=\"ptr\" title>&#x25A0;</span> fer <sup class=\"homograph\">3</sup> | fera",
      "url": "https://www.enciclopedia.cat/ec-gdlc-e00063275.xml"
    }
  ]
}
```

### Diccionari català-valencià-balear (DCVB)

```
$ curl --silent http://localhost:3000/dcvb/getUrlsByWord/estevanet | jq
{
  "data": [
    {
      "title": "estevanet",
      "url": "https://dcvb.iec.cat/results.asp?word=estevanet"
    }
  ]
}
```

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
