const axios = require('axios');
const{app_id,app_key} = require('./secret/secret.js');
const chalk = require('chalk');
const syn = [];
var def = [];
var ant = [];

//to get definitions for given word
const definitions = async (word,type) => {
  var url = `/entries/en/${word}/definitions`
  var txt = `Definitions are :\n`
 // console.log(type);
 
  await getData(url)
    .then(response => processData(response.data))
    .then(response => print(response, txt, 'definitions',type))
    .catch(err => console.log(chalk.red("No entries found for definitions")))

  return Promise.resolve()
}

//get examples for given word
const examples = async (word,type) => {
  var url = `/entries/en/${word}/examples`
  var txt = `Examples  are :\n`
 
  await getData(url)
    .then(response => processData(response.data))
    .then(response => print(response, txt, 'examples',type))
    .catch(err => console.log(chalk.red("No entries found for examples")))

  return Promise.resolve()
}

//get synonyms for given word
const synonyms = async (word,type) => {
  var url = `/entries/en/${word}/synonyms`
  var txt = `Synonyms are :\n`
  
  await getData(url)
    .then(response => processData(response.data))
    .then(response => print(response, txt, 'synonyms',type))
    .catch(err => console.log(chalk.blue("\nSynonyms are :\n")+chalk.red("No entries found for synonyms\n")))

  return Promise.resolve()
}

//get antonyms for given word
const antonyms = async (word,type) => {
  var url = `/entries/en/${word}/antonyms`
  var txt = `Antonyms are :\n`
 
  await getData(url)
    .then(response => processData(response.data))
    .then(response => print(response, txt, 'antonyms',type))
    .catch(err => console.log(chalk.blue("\nAntonyms are :\n")+chalk.red("No entries found for Antonyms\n")))

  return Promise.resolve()
}
//jumble the given word
function jumble (word) {
  word = word.split('')
  for (var i = word.length - 1; i >= 0; i--) {
    var rand = Math.floor(Math.random() * i)
    var temp = word[i]
    word[i] = word[rand]
    word[rand] = temp
  }
  word = word.join('')
  console.log(chalk.blue("\njumble Word :\n"))
  console.log(word+"\n");
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
function processData (response) {
  return Promise.resolve(response)
}

// print function
function print (response, txt, id,type) {
  console.log("\n"+chalk.blue(txt));
	eachRecursive(response,txt,id,type);
	if(type){
		getprint(id,0);
	}
}

//recursively iterate the response json and print the required data
function eachRecursive(obj,txt,id,type)
{
	for (var k in obj)
  {
    if (typeof obj[k] == "object" && obj[k] !== null){
      if(id != "definitions"){
	      if(k == id){
	        if(type){
	        	store(obj[k][0].text,id);
	        }else{
	        	console.log(chalk.green(obj[k][0].text))
	        }
	      }
	    }else{
	      if(k == 'senses' || k== 'subsenses' ){
	        if(type){
	        	store(obj[k][0].definitions,id)
	        }else{
	        	console.log(chalk.green(obj[k][0].definitions));
	        }
	      }
      }
      eachRecursive(obj[k],txt,id,type);
	  }
	}
}
//storing synonyms and antonyms,definitions to show hint
function store(obj,type){
	if(type == "synonyms"){
		syn.push(obj);
	}else if(type == "antonyms"){
		ant.push(obj);
	}else if(type == "definitions"){
		def.push(obj);
	}
}
function getprint(id,index){
  console.log("\n");
	if(id == "synonyms"){
		console.log(syn[index]);
	}else if(id == "antonyms"){
		console.log(ant[index]);
	}else if(id == "definitions"){
		console.log(def[index]);
	}
  console.log("\n");
}

//generating hint randomly for guessing game
const hint = async(rand) => {
  var hi = Math.floor(Math.random() * (5 - 1) + 1);
  console.log(chalk.red("\n HINT :"))
  if(hi == 1){
    if(syn.length){
      var r = Math.floor(Math.random() * syn.length);
      console.log(chalk.blue("\n Synonym :"))
      getprint('synonyms',r);
      var removed = syn.splice(r,1);
      syn.splice(0, 0, removed[0]);
    }else{
      jumble(rand);
    }
  }else if(hi == 2){
    if(ant.length){
    	var r = Math.floor(Math.random() * ant.length);
    	console.log(chalk.blue("\n Antonym :"))
      getprint('antonyms',r);
    }else{
       jumble(rand);
    }
  }else if(hi == 3){
  	var r = Math.floor(Math.random() * def.length);
  	console.log(chalk.blue("\n Definition :"))
    getprint('definitions',r);
  }else{
  	 jumble(rand);
  }

}

module.exports = {examples,definitions,synonyms,antonyms,hint,syn};
	