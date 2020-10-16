//"test": "mocha --timeout 5000 --require @babel/register --recursive --exit --ui tdd tests/"


import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

var textArea = document.querySelector("#text-input");
var valueSelect = document.querySelector("#locale-select");
var tSentence = document.querySelector("#translated-sentence");
var tError = document.querySelector("#error-msg");
var btn_translate = document.querySelector("#translate-btn");
var btn_clear = document.querySelector("#clear-btn");
let val = '';
let mode = "american-to-british";
var arr_american =(Object.entries(americanOnly))//.concat(Object.entries(americanToBritishSpelling)).concat(Object.entries(americanToBritishTitles));
var arr_british = Object.entries(britishOnly);
var american_british = (Object.entries(americanToBritishSpelling)).concat(Object.entries(americanToBritishTitles));
let arr_titles = Object.keys(americanToBritishTitles);
let arr_titles_british = Object.values(americanToBritishTitles);

console.log(arr_titles)
textArea.onchange = () =>{
  val = textArea.value;
}

valueSelect.onchange = () =>{
  mode = valueSelect.value;
}

btn_translate.onclick = () => {
  val = textArea.value;
  mode = valueSelect.value;
  functionTranslate(val, mode);
}

btn_clear.onclick = () => {
  functionClear();
}

function functionClear(){
  textArea.value = '';
  tError.innerHTML = '';
  tSentence.innerHTML = '';
}

const functionTranslate = (val, mode) => {
  var text = val;
  var copy_text = val;
  var re_american = /\d{1,2}\:\d{1,2}/gi;
  var re_british = /\d{1,2}\.\d{1,2}/gi;
  var regex_not = /\W/i;
  var match_time = [];
  //console.log(text, document.querySelector("#locale-select").value, 'oeoeoeooeoe')
  tSentence.innerText = '';
  tError.innerText = '';

  if(text == ''){
    tError.innerHTML = 'Error: No text to translate.';
  }
  else if(text != '' && mode == "american-to-british"){
    for (const pair in arr_american){
      var i = (text.toLowerCase()).indexOf(arr_american[pair][0]);
      var re = new RegExp(arr_american[pair][0], 'gi');
      var valid = (text[i+arr_american[pair][0].length] == undefined || regex_not.test(text[i+arr_american[pair][0].length]));
      
      if( i != -1 && valid){
        var word = '';
        if (arr_titles.includes(arr_american[pair][0])) word = '<span class="highlight">' + arr_american[pair][1][0].toUpperCase()+ arr_american[pair][1].slice(1) + '</span>';
        else word = '<span class="highlight">' + arr_american[pair][1] + '</span>';
        console.log(valid)
        copy_text = copy_text.replace(re, word);
        //return_text = return_text.replace(re, arr_american[pair][1]);
      }
    }
    for (const pair in american_british){
      var i = (text.toLowerCase()).indexOf(american_british[pair][0]);
      var re = new RegExp(american_british[pair][0], 'gi');
      var valid = (text[i+american_british[pair][0].length] == undefined || regex_not.test(text[i+american_british[pair][0].length]));
      
      if( i != -1 && valid){
        var word = '';
        if (arr_titles.includes(american_british[pair][0])) word = '<span class="highlight">' + american_british[pair][1][0].toUpperCase()+ american_british[pair][1].slice(1) + '</span>';
        else word = '<span class="highlight">' + american_british[pair][1] + '</span>';
        console.log(valid)
        copy_text = copy_text.replace(re, word);
        //return_text = return_text.replace(re, arr_american[pair][1]);
      }
    }
    match_time = copy_text.match(re_american);
    if(match_time !== null){
      for(var m of match_time){
        var reg = new RegExp(m, 'gi');
        copy_text = copy_text.replace(reg, '<span class="highlight">' + m.replace(/\:/, '.') + '</span>');
        //return_text = return_text.replace(reg, m.replace(/\:/, '.'));
      }
    }
    if(text == copy_text){
      tSentence.innerHTML = 'Everything looks good to me!';
      console.log((text.toLocaleLowerCase()))
      //console.log(tError.html().toString()+'hello')
      //return 'Everything looks good to me!';
    } else{
      tSentence.innerHTML = copy_text;
    }
    
    //console.log(tSentence.html().toString());
    //return return_text;
  }
  else if (text !== '' && mode == "british-to-american"){
    console.log('hello.....');
    for (const pair in arr_british){
      //agregar los resultados del array american british
      var i = (text.toLowerCase()).indexOf(arr_british[pair][0]);
      var re = new RegExp(arr_british[pair][0], 'gi');
      var valid = (text[i+arr_british[pair][0].length] == undefined || regex_not.test(text[i+arr_british[pair][0].length]));
      if( i != -1 && valid){
        var word = '';
        if (arr_titles.includes(arr_british[pair][0])) word = '<span class="highlight">' + arr_british[pair][1][0].toUpperCase()+ arr_british[pair][1].slice(1) + '</span>';
        else word = '<span class="highlight">' + arr_british[pair][1] + '</span>';
        copy_text = copy_text.replace(re, word);
      }
    }
    for (const pair in american_british){
      var i = (text.toLowerCase()).indexOf(american_british[pair][1]);
      var re = new RegExp(american_british[pair][1], 'gi');
      var valid = (text[i+american_british[pair][1].length] == undefined || regex_not.test(text[i+american_british[pair][1].length]));
      
      if( i != -1 && valid){
        var word = '';
        if (arr_titles_british.includes(american_british[pair][1].toLowerCase())){
          word = '<span class="highlight">' + american_british[pair][0][0].toUpperCase()+ american_british[pair][0].slice(1) + '</span>';
        } else word = '<span class="highlight">' + american_british[pair][0] + '</span>';
        console.log(valid)
        copy_text = copy_text.replace(re, word);
        //return_text = return_text.replace(re, arr_american[pair][1]);
      }
    }
    match_time = copy_text.match(re_british);
    if(match_time !== null){
      for(var m of match_time){
        var reg = new RegExp(m, 'gi');
        copy_text = copy_text.replace(reg, '<span class="highlight">' + m.replace(/\./, ':') + '</span>');
        //return_text = return_text.replace(reg, m.replace(/\./, ':'));
      }
    }
    if(text == copy_text){
      tSentence.innerHTML = 'Everything looks good to me!';
    } else {
      tSentence.innerHTML = copy_text;
    }
    //return return_text;
    //console.log(copy_text);
  }
}

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    functionTranslate,
    functionClear,
  }
} catch (e) {}
