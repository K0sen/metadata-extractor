const { expect } = require('chai');
const path = require('path');
const { readFile } = require('../../src/fileSystem');
const { parseXmlToJson } = require('../../src/xmlParser');

const fileNames = ['pg1', 'pg2'];

describe('Xml service', () => {
  it('Should parse xml file to json object', () => {
    fileNames.forEach(async fileName => {
      const xmlContent = await readFile(path.resolve(__dirname, `books/${fileName}.rdf`));
      const jsonContent = await readFile(path.resolve(__dirname, `booksOutput/${fileName}.json`));
      const parsed = await parseXmlToJson(xmlContent);
      expect(JSON.parse(jsonContent.toString())).to.deep.equal(parsed);
    })
  });
});
