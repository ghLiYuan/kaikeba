#!/usr/bin/env node
console.log('cli...')

const program = require('commander');
program.version(require('../package.json').version)
// program.version(`1.1`)

program
.command('init <name>')
.description('init project')
.action(require('../lib/init.js'))

program.parse(process.argv)