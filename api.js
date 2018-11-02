const axios = require('axios');
const{app_id,app_key} = require('./secret/secret.js');

//to get definitions for given word
const definitions = async (word) => {
  var url = `/entries/en/${word}/definitions`
  var txt = `Definitions for '${word}' are :\n`
 
  await getData(url)
    .then(response => processData(response.data, 'def'))
    .then(response => print(response, txt, 'syn'))
    .catch(err => console.log(err))

  return Promise.resolve()
}

//get examples for given word
const examples = async (word) => {
  var url = `/entries/en/${word}/examples`
  var txt = `Examples for '${word}' are :\n`
 
  await getData(url)
    .then(response => processData(response.data, 'ex'))
    .then(response => print(response, txt, 'syn'))
    .catch(err => console.log(err))

  return Promise.resolve()
}

//get synonyms for given word
const synonyms = async (word) => {
  var url = `/entries/en/${word}/synonyms`
  var txt = `Synonyms for '${word}' are :\n`
  
  await getData(url)
    .then(response => processData(response.data, 'syn'))
    .then(response => print(response, txt, 'syn'))
    .catch(err => console.log(err))

  return Promise.resolve()
}

//get antonyms for given word
const antonyms = async (word) => {
  var url = `/entries/en/${word}/antonyms`
  var txt = `Antonyms for '${word}' are :\n`
 
  await getData(url)
    .then(response => processData(response.data, 'ant'))
    .then(response => print(response, txt, 'syn'))
    .catch(err => console.log(err))

  return Promise.resolve()
}

function jumble (word) {
  word = word.split('')
  for (var i = word.length - 1; i >= 0; i--) {
    var rand = Math.floor(Math.random() * i)
    var temp = word[i]
    word[i] = word[rand]
    word[rand] = temp
  }
  word = word.join('')
  return word
}

// GET request

function getData (url) {
  return axios({
    url: url,
    baseURL: 'https://od-api.oxforddictionaries.com/api/v1',
    method: 'get',
    headers:{
    	'Accept':'application/json',
    	'app_id':app_id,
    	'app_key':app_key
    }
  })
}

// data formatting

function processData (response, id) {
  return Promise.resolve(response)
}

// print function

function print (response, txt, id) {
  
    console.log(txt);
    console.log(response);
    console.log(response.results[0]);
    console.log(response.results[0].lexicalEntries[0].entries)
  
}

module.exports = {examples,definitions,synonyms,antonyms};
	