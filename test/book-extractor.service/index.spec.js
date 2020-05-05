const { expect } = require('chai');
const path = require('path');
const { readFile } = require('../../src/fileSystem');
const makeBookExtractService = require('../../src/book-extractor.service');
const { parseXmlToJson } = require('../../src/xmlParser');
const getValueFromObject = require('../../src/helpers/getValueFromObject');

let fileWrited = false;
const fileNames = ['pg1', 'pg2'];
const properBookObjects = {
  pg1: {
    "title": "The Declaration of Independence of the United States of America",
    "author": "United States President (1801-1809)",
    "publisher": "Project Gutenberg",
    "publicationDate": "1971-12-01",
    "language": "en",
    "licenseRights": "Public domain in the USA."
  },
  pg2: {
    "title": "The United States Bill of Rights\r\nThe Ten Original Amendments to the Constitution of the United States",
    "author": "U.S.A.",
    "publisher": "Project Gutenberg",
    "publicationDate": "1972-12-01",
    "language": "en",
    "licenseRights": "Public domain in the USA."
  },
}

const mockedDependencies = {
  bookRepository: {
    create: () => Promise.resolve(fileWrited = true),
  },
  readFile,
  parseXmlToJson,
  getValueFromObject,
}

const { handleBook, transformJSONToBookObject } = makeBookExtractService(mockedDependencies);

describe('Book extractor service', () => {
  it('Should transfrom JSON metadata to the book object', () => {
    fileNames.forEach(async fileName => {
      const jsonBookContent = await readFile(path.resolve(__dirname, `../xmlParser/booksOutput/${fileName}.json`));
      const bookObject = transformJSONToBookObject(JSON.parse(jsonBookContent));
      expect(bookObject).to.deep.equal(properBookObjects[fileName]);
    });
  });

  it('Should handle file parsing and saving', () => {
    fileNames.forEach(async fileName => {
      await handleBook(path.resolve(__dirname, `../xmlParser/books/${fileName}.rdf`));
      expect(fileWrited).to.be.true;
    })
  });
});
