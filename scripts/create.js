#!/usr/bin/env node
const fs = require('fs');
const package_json = JSON.parse(fs.readFileSync('./package.json', 'UTF-8'));
package_json.scripts.mock = 'nodemon ./node_modules/mock-user-auth/bin/www.js';
fs.writeFileSync('./package.json', JSON.stringify(package_json, null, 2), 'utf8');
