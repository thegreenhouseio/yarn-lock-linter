#!/usr/bin/env node

// console.log('__dirname!', __dirname);  // eslint-disable-line
// console.log('process.cwd()!', process.cwd());  // eslint-disable-line

const YarnLinter = require('./yarn-linter');
const context = process.cwd();

new YarnLinter(context);  // eslint-disable-now no-new