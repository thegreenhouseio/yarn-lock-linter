#!/usr/bin/env node

// const fs = require('fs');

class YarnLinter {

  constructor(context) {
    this.fsOptions = {
      encoding: 'utf-8'
    };

    if (context) {
      this.validateYarnInstall(context);
    } else {
      throw new Error('no context provided!');
    }
  }

  validateYarnInstall(context) {
    // get files
    const packageJson = require(`${context}/package.json`);
    // const yarnLock = fs.readFileSync(`${context}/yarn.lock`, this.fsOptions);
    // const dependencies = ;
    // console.log('dependencies', dependencies);  // eslint-disable-line

    return YarnLinter.getAllDependencies(packageJson);
  }

  static getAllDependencies(packageJson) {
    const mergedDeps = {};
    const deps = packageJson.dependencies || {};
    const devDeps = packageJson.devDependencies || {};
    const peerDeps = packageJson.peerDependencies || {};

    for (let key in deps) {
      mergedDeps[key] = deps[key].replace('^', '').replace('~', '');
    }

    for (let key in devDeps) {
      mergedDeps[key] = devDeps[key].replace('^', '').replace('~', '');
    }

    for (let key in peerDeps) {
      mergedDeps[key] = peerDeps[key].replace('^', '').replace('~', '');
    }

    return mergedDeps;
  }
}

module.exports = YarnLinter;