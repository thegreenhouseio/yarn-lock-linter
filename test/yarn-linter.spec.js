const ava = require('ava');
const YarnLinter = require('../src/yarn-linter');

ava('YarnLinter should instantiate correctly when context is provided', t => {
  let linter = new YarnLinter(process.cwd());

  t.truthy(linter);
});

ava('YarnLinter should not instantiate correctly when no context is provided', t => {
  let exception = t.throws(() => {
    new YarnLinter();  // eslint-disable-line no-new
  });

  t.is(exception.message, 'no context provided!');
});

ava('YarnLinter.getAllDependencies should return nothing when no dependencies are defined', t => {
  let packageJson = {
    dependencies: {},
    devDependencies: {},
    peerDependencies: {}
  };
  let result = YarnLinter.getAllDependencies(packageJson);

  t.deepEqual(result, {});
});

ava('YarnLinter.getAllDependencies should return only found dependencies when just dependencies are defined', t => {
  let packageJson = {
    dependencies: {
      yll: '^1.0.0'
    },
    devDependencies: {},
    peerDependencies: {}
  };
  let result = YarnLinter.getAllDependencies(packageJson);

  t.deepEqual(result, {
    yll: '1.0.0'
  });
});

ava('YarnLinter.getAllDependencies should return only found devDependencies when just devDependencies are defined', t => {
  let packageJson = {
    dependencies: {},
    devDependencies: {
      yll: '1.0.0'
    },
    peerDependencies: {}
  };
  let result = YarnLinter.getAllDependencies(packageJson);

  t.deepEqual(result, {
    yll: '1.0.0'
  });
});

ava('YarnLinter.getAllDependencies should return only found peerDependencies when just peerDependencies are defined', t => {
  let packageJson = {
    dependencies: {},
    devDependencies: {},
    peerDependencies: {
      yll: '1.0.0'
    }
  };
  let result = YarnLinter.getAllDependencies(packageJson);

  t.deepEqual(result, {
    yll: '1.0.0'
  });
});

ava('YarnLinter.getAllDependencies should return all dependencies when all types of dependencies are defined', t => {
  let packageJson = {
    dependencies: {
      ava: '~3.1.0'
    },
    devDependencies: {
      abs: '^1.1.1'
    },
    peerDependencies: {
      yll: '1.0.0'
    }
  };
  let result = YarnLinter.getAllDependencies(packageJson);

  t.deepEqual(result, {
    ava: '3.1.0',
    abs: '1.1.1',
    yll: '1.0.0'
  });
});