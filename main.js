#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { utility } = require('./utility');
const {treeFn} = require('./commands/tree')
const {organizeFn} = require('./commands/organize')
const { helpFn } = require('./commands/help');

const inputArr = process.argv.slice(2);
console.log(inputArr);

let command = inputArr[0];

switch (command) {
  case 'tree':
    treeFn(inputArr[1]);
    break;
  case 'organize':
    organizeFn(inputArr[1]);
    break;
  case 'help':
    helpFn(inputArr[1]);
    break;
  default:
    console.log('Enter valid command');
    break;
}