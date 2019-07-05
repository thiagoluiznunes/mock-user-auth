#!/usr/bin/env node
const fs = require('fs');
const package_json = JSON.parse(fs.readFileSync('./dist/package.json', 'UTF-8'));
package_json.scripts = {
  "postinstall": "node ./scripts/create.js"
};
fs.writeFileSync('./dist/package.json', JSON.stringify(package_json, null, 2), 'utf8');
