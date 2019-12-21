#!/bin/sh

curl https://raw.githubusercontent.com/Softcatala/catalan-dict-tools/master/resultats/lt/diccionari.txt > ./source/languagetool/diccionari.txt
cut -d' ' -f1 ./source/languagetool/diccionari.txt > ./source/languagetool/paraules.txt
egrep '^[A-Z]+' ./source/languagetool/paraules.txt > ./source/languagetool/majuscules.txt
