#!/usr/bin/env node

const program = require('commander');
// const { prompt } = require('inquirer');
const {examples,definitions,synonyms,antonyms} = require('./api');




program 
  .version('1.0')
  .description('Dictionary')

program
  .command('def')
  .alias('d')
  .description('Get definitions')
  .action((word) => {
    definitions(word);
  });

program
  .command('syn')
  .alias('s')
  .description('Get Synonyms')
  .action((word) => {
    synonyms(word);
  });

program
  .command('ant')
  .alias('a')
  .description('Get Antonyms')
  .action((word) => {
    antonyms(word);
  });

program
  .command('ex')
  .alias('e')
  .description('Get Examples')
  .action((word) => {
    examples(word);
  });

program
  .command('dict')
  .alias('')
  .description('Get ALL')
  .action((word) => {
    examples(word);
    antonyms(word);
    definitions(word);
    synonyms(word);
  });

if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv)
