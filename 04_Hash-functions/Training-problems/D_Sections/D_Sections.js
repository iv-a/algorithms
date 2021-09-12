const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfLogEntries;
const logEntries = [];

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfLogEntries = Number(line);
  } else if (lineNumber < numberOfLogEntries + 1) {
    logEntries.push(line);
  }
  lineNumber++;
});

function sectionList(logEntries) {
  const set = new Set();
  for (let logEntry of logEntries) {
    set.add(logEntry);
  }
  return set;
}

io_interface.on('close', function () {
  const sections = sectionList(logEntries);
  for (let section of sections) {
    console.log(section);
  }
});