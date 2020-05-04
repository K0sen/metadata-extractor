const promisify = require('util').promisify;
const fs = require('fs');
const readDirectory = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const appendToFile = promisify(fs.writeFile);

const readFileStream = filePath => {
  return new Promise(resolve => {
    let content;
    const stream = fs.createReadStream(filePath);
    stream.on('data', chunk => {
      content += chunk;
    });
    stream.on('close', () => {
      resolve(content);
    });
  });
}

module.exports = {
  readFile,
  readDirectory,
  appendToFile,
  readFileStream,
}