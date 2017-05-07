const ava = require('ava');
const YarnLinter = require('../src/yarn-linter');

ava('YarnLinter should instantiate correctly', t => {
  let linter = new YarnLinter(process.cwd());

  t.truthy(linter);
});

ava('YarnLinter.validateContext should return true when a targetDirectory is provided', t => {
  const isValid = YarnLinter.validateContext(process.cwd());

  t.true(isValid);
});

ava('YarnLinter.validateContext should thrown an exception when a targetDirectory is not provided', t => {
  let exception = t.throws(() => {
    YarnLinter.validateContext();
  });

  t.is(exception.message, 'no context provided!');
});