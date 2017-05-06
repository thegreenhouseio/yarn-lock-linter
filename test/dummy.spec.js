const ava = require('ava');
const MyClass = require('../src/dummy');

ava('that it should return true', t => {
  let instance = new MyClass();

  t.true(instance.myMethod());

});