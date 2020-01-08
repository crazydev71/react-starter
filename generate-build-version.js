const fs = require('fs');
const packageJson = require('./package.json');

const appVersion = packageJson.version;

const jsonData = {
  version: appVersion,
};

const jsonContent = JSON.stringify(jsonData);

fs.writeFile('./public/meta.json', jsonContent, 'utf8', (err) => {
  if (err) {
    console.log('An error occured while writing JSON Object to meta.json');
    return false;
  }

  console.log('meta.json file has been saved with latest version number');
  return true;
});
