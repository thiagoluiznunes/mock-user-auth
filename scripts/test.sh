#!/bin/bash
NODE_ENV=test ./node_modules/.bin/mocha --require @babel/register --require babel-polyfill ./components/**/*.spec.js ./**/*.spec.js
