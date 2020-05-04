module.exports = (workerPool, hrstart) => {
  let finishedWorkers = 0;
  workerPool.forEach((worker, i) => {
    worker.on('message', (value) => {
      console.log('>>>', value);
    })
  
    worker.on('exit', (value) => {
      finishedWorkers++;
      const [second, milliseconds] = process.hrtime(hrstart);
      console.log(`worker #${i + 1} has finished in ${second}s ${milliseconds / 1000000}ms`);
  
      if (finishedWorkers === workerPool.length) {
        console.log(`Total execution time: ${second}s ${milliseconds / 1000000}ms\nYou can exit the program`);
      }
    })
  });
};
