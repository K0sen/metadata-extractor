require('dotenv').config();

const path = require('path');
const os = require('os');
const { Worker, isMainThread, workerData, parentPort } = require('worker_threads');
const { readDirectory } = require('./fileSystem');
const makeBookExtractService = require('./book-extractor.service');
const { readFile, appendToFile } = require('./fileSystem');
const { parseXmlToJson } = require('./xmlParser');
const getValueFromObject = require('./helpers/getValueFromObject');
const addWorkerListeners = require('./helpers/addWorkerListeners');
const bookSchema = require('./db/book.schema');
const BookRepository = require('./db/book.repository');
const SequelizeClient = require('./db/sequelizeClient');
const { database, username, password, port, pathToBookFolders } = require('./config');

const dbClient = new SequelizeClient({ database, username, password, port });
const bookModel = dbClient.addModel('book', bookSchema, {});

(async () => {
  const hrstart = process.hrtime();
  const bookRepository = new BookRepository(bookModel);
  await dbClient.init();
  const { handleBook } = makeBookExtractService({
    bookRepository,
    readFile,
    parseXmlToJson,
    getValueFromObject,
    appendToFile,
  });

  if (isMainThread) {
    const cpus = os.cpus();
    const bookFolders = await readDirectory(pathToBookFolders);
    const numberOfBooks = bookFolders.length;
    const workerPool = cpus.map((cpu, i) => {
      const step = Math.ceil(numberOfBooks / cpus.length);
      const start = i * step;
      const range = { start, end: start + step };
      return new Worker(path.resolve(__filename), {
        workerData: {
          ...range,
          bookFolders,
          startTime: hrstart,
        }
      });
    });

    addWorkerListeners(workerPool, hrstart);
  } else {
    const { bookFolders, start, end } = workerData;
    const bookFoldersChunk = bookFolders.slice(start, end);
    for (const dirName of bookFoldersChunk) {
      const bookNames = await readDirectory(`${pathToBookFolders}/${dirName}`);
      await Promise.all(
        bookNames.map((bookName) =>
          handleBook(`${pathToBookFolders}/${dirName}/${bookName}`))
      );
    }
    process.exit();
  }
})()
  .then(() => {})
  .catch(error => console.log(error));
