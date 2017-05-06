#!/usr/bin/env node

// const fs = require('fs');

class YarnLinter {

  constructor(context) {
    this.fsOptions = {
      encoding: 'utf-8'
    };

    if (this.validateContext(context)) {
      this.validateYarnInstall(context);
    }
  }

  validateContext(context = null) {
    if (!context) {
      throw new Error('no context provided!');
    }

    return true;
  }

  validateYarnInstall(context) {
    // get files
    const packageJson = require(`${context}/package.json`);
    // const yarnLock = fs.readFileSync(`${context}/yarn.lock`, this.fsOptions);
    // const dependencies = ;
    // console.log('dependencies', dependencies);  // eslint-disable-line

    return this.getDependencies(packageJson);
  }

  getDependencies(packageJson) {
    const mergedDeps = {};
    const deps = packageJson.peerDependencies || {};
    const devDeps = packageJson.devDependencies || {};
    const peerDeps = packageJson.dependencies || {};

    console.log('deps', deps);  // eslint-disable-line
    console.log('devDeps', devDeps);  // eslint-disable-line
    console.log('peerDeps', peerDeps);  // eslint-disable-line

    for (let key in deps) {
      // console.log('!!!!!key', key); //eslint-disable-line
      mergedDeps[key] = deps[key].replace('^', '').replace('~');
    }

    for (let key in devDeps) {
      // console.log('!!!!!key', key); //eslint-disable-line
      mergedDeps[key] = devDeps[key].replace('^', '').replace('~');
    }

    for (let key in peerDeps) {
      // console.log('!!!!!key', key); //eslint-disable-line
      mergedDeps[key] = peerDeps[key].replace('^', '').replace('~');
    }

    console.log('mergedDeps', mergedDeps); // eslint-disable-line
    return mergedDeps;
  }
}

module.exports = YarnLinter;