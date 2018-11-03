#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const {examples,definitions,synonyms,antonyms,hint,syn} = require('./api');
const randomwords = ['stick','sloppy','insult','counsel','cuddly','cynical','cattle','gaze','subtract','icy','curvy','display','glitter','romantic','train','reaction','colorful','ink','start','typical','enthusiastic','bash','blue','frail','hot','tearful','bustling','servant','resist','smother','race','plain','cooing','meet','insult','tin','phone','stick','sloppy','rub','sit'];
var rand;

const q = [
{
  type:'input',
  name:'word',
  message:"\nGuess the Word : "
}]
const qq = [
{
  type:'input',
  name:'option',
  message:"\nEnter your Choice : "
}
]


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
    definitions(word,false);
    examples(word,false);
    synonyms(word,false);
    antonyms(word,false);
});
program
  .arguments('<word>')
  .action((word) => {
    definitions(word,false);
    examples(word,false);
    synonyms(word,false);
    antonyms(word,false);
});



program
  .command('play')
  .alias('p')
  .action(() =>{
    console.log("\nLet's Play Game :");
    rand = randomwords[Math.floor(Math.random() * randomwords.length)];
    definitions(rand,true);
    synonyms(rand,true);
    antonyms(rand,true);
    guess(rand);
    
  });
function guess(rand){
  prompt(q).then(answers =>
  checkresult(answers,rand))
}
function checkresult(word,rand){
  var removed = syn.splice(0,1);
  if((word.word == rand) ||syn.includes(word.word)){
    console.log(chalk.green("You're Right !!"));

  }else{
    console.log(chalk.yellow(`You guessed wrong :/

        1: Guess again
        2: New hint
        3: Show word and quit
      `))
    repeat(rand);
  }
  syn.splice(0, 0, removed[0]);
}

function repeat(rand){
  prompt(qq).then(answers =>
  repeatgame(answers,rand))
}

function repeatgame(option,rand){
  var option = option.option
  if(option == 1){
    guess(rand);
  }else if(option == 2){
    hint(rand);
    guess(rand);
  }else if(option == 3){
    console.log("\nThe Word is : "+ rand);
    definitions(rand,false);
    examples(rand,false);
    synonyms(rand,false);
    antonyms(rand,false);

  }

}


if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv)
