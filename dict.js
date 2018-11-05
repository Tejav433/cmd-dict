#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const {examples,definitions,synonyms,antonyms,hint,syn} = require('./api');
//random words for word of the day and game
const randomwords = ['stick','sloppy','insult','counsel','cuddly','cynical','cattle','gaze','subtract','icy','curvy','display','glitter','romantic','train','reaction','colorful','ink','start','typical','enthusiastic','bash','blue','frail','hot','tearful','bustling','servant','resist','smother','race','plain','cooing','meet','insult','tin','phone','stick','sloppy','rub','sit'];
var rand;

const q = [
{
  type:'input',
  name:'word',
  message:chalk.magenta("Guess the Word : ")
}]
const qq = [
{
  type:'input',
  name:'option',
  message:chalk.green("Enter your Choice : ")
}]


program 
  .version('1.0')
  .description('Dictionary')

program
  .command('def <word>')
  .alias('d')
  .description('Get definitions')
  .action((word) => {
    definitions(word,false);
  });

program
  .command('syn <word>')
  .alias('s')
  .description('Get Synonyms')
  .action((word) => {
    synonyms(word,false);
  });

program
  .command('ant <word>')
  .alias('a')
  .description('Get Antonyms')
  .action((word) => {
    antonyms(word,false);
  });

program
  .command('ex <word>')
  .alias('e')
  .description('Get Examples')
  .action((word) => {
    examples(word,false);
  });

program
  .command('dict <word>')
  .alias('dic')
  .description('Get ALL')
  .action((word) => {
   getall(word,false);
});

program
  .arguments('<word>')
  .action((word) => {
   getall(word,false);
});

program
  .command('play')
  .alias('p')
  .description('Play Word Guessing Game')
  .action(() =>{
    console.log(chalk.cyan("\n*************Let's Play Game **************"))
    rand = randomwords[Math.floor(Math.random() * randomwords.length)];
    definitions(rand,true);
    synonyms(rand,true);
    antonyms(rand,true);
    guess(rand); 
});

//to ask question guess the word
function guess(rand){
  prompt(q).then(answers =>
  checkresult(answers,rand))
}
//check the result and repeat process if wrong
function checkresult(word,rand){
  var removed = syn.splice(0,1);
  if((word.word == rand) ||syn.includes(word.word)){
    console.log(chalk.green("\nYou're Right !!"));

  }else{
    console.log(chalk.yellow(`\nYou guessed wrong :/

        1: Guess again
        2: New hint
        3: Show word and quit
      `))
    repeat(rand);
  }
  syn.splice(0, 0, removed[0]);
}
//if guess word wrong options to display
function repeat(rand){
  prompt(qq).then(answers =>
  repeatgame(answers,rand))
}

//repeat the process till quit or right answer
function repeatgame(option,rand){
  var option = option.option
  if(option == 1){
    guess(rand);
  }else if(option == 2){
    hint(rand);
    guess(rand);
  }else if(option == 3){
    console.log("\nThe Word is : "+ rand);
    getall(rand,false);
  }
}
//to get word of the day 
function wordoftheday(){
  rand = randomwords[Math.floor(Math.random() * randomwords.length)];
  console.log(chalk.blue("\nWord of the Day is : "))
  console.log(chalk.green(rand));
  getall(rand,false);
}

function getall(rand,val){
  definitions(rand,val);
  examples(rand,val);
  synonyms(rand,val);
  antonyms(rand,val);
} 

if (!process.argv.slice(2).length) {
  wordoftheday();
  // program.outputHelp();
  // process.exit();
}
program.parse(process.argv)
