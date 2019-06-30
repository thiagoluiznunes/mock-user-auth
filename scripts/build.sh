#!/bin/bash
rm -rf ./dist
./node_modules/.bin/babel ./bin --out-dir dist/bin
./node_modules/.bin/babel ./components --out-dir dist/components
./node_modules/.bin/babel ./config --out-dir dist/config
./node_modules/.bin/babel ./app.js --out-dir dist
cp components/mock/users.json dist/components/mock
cp package.json dist/
cp README.md dist/
cp LICENSE.md dist/

