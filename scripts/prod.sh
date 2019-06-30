#!/bin/bash
npm i pm2 --sav--dev
./node_modules/.bin/pm2 start ./dist/bin/www.js
./node_modules/.bin/pm2 monit
