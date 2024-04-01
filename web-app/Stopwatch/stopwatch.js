console.log('Stopwatch');

let secondsCounter = 0;
setInterval(() => {
    // console.log('*\r');
    secondsCounter++;
    process.stdout.write(`${secondsCounter} seconds\r`);
}, 1000);
