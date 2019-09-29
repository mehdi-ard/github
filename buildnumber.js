const editJsonFile = require('edit-json-file');

let package = editJsonFile(`${__dirname}/package.json`, {
  autosave: true
});

let currentVersion = package.get('version').split('.');
currentVersion[2] = parseInt(currentVersion[2]) + 1;
package.set('version', currentVersion.join('.'));
