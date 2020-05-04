const { expect } = require('chai');
const path = require('path');
const { readFile } = require('../../src/fileSystem');
const makeBookExtractService = require('../../src/book-extractor.service');
const { parseXmlToJson } = require('../../src/xmlParser');
const getValueFromObject = require('../../src/helpers/getValueFromObject');

let fileWrited = false;

const mockedDependencies = {
  bookRepository: {
    create: () => Promise.resolve(fileWrited = true),
  },
  readFile,
  parseXmlToJson,
  getValueFromObject,
}

const { handleBook } = makeBookExtractService(mockedDependencies);

describe('Book extractor service', () => {
  it('Should handle file parsing and saving', async () => {
    const res = await handleBook(path.resolve(__dirname, `../xmlParser/books/pg1.rdf`));
    expect(fileWrited).to.be.true;
  });
});
