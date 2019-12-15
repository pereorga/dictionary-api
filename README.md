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
$ curl --silent http://localhost:3000/commonvoice/getSentences/pebrot | jq
{
  "data": [
    "Poseu oli en una cassola, fregiu el pebrot tallat a tires amples.",
    "Poseu la ceba picada, el pebrot tallat i el fetge en una cassola amb oli.",
    "Quan s'escalfi, remeneu-ho una mica i afegiu-hi la ceba picada i el pebrot a talls.",
    "Arròs, peix i pebrot volen el vi ben fort.",
    "El peix, l'arròs i el pebrot volen vi fort."
  ]
}
```
