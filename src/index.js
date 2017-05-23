#!/usr/bin/env node

const YarnLinter = require('./yarn-linter');
const context = process.cwd();

new YarnLinter(context);  // eslint-disable-line no-new