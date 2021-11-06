function solution(measurements, pattern) {
  const occurrences = [];
  let start = 0;
  let min = Math.min.apply(null, pattern);
  pattern.forEach((item, i, arr) => arr[i] = item - min);
  let pos = findPattern(measurements, pattern, start);
  while (pos !== -1) {
    occurrences.push(pos + 1);
    start = pos + 1;
    pos = findPattern(measurements, pattern, start);
  }
  return occurrences.join(' ');
}

function findPattern(array, pattern, start = 0) {
  if (array.length < pattern.length) {
    return -1;
  }
  for (let pos = start; pos <= array.length - pattern.length; pos++) {
    let match = true;
    for (let offset = 1; offset < pattern.length; offset++) {
      if (array[pos + offset] - pattern[offset] !== array[pos + offset - 1] - pattern[offset - 1]) {
        match = false;
        break;
      }
    }
    if (match === true) return pos;
  }
  return -1;
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;

let numberOfMeasurements;
let measurements;
let patternSize;
let pattern;
const DEX = 10;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfMeasurements = parseInt(line, DEX);
  } else if (lineNumber === 1) {
    measurements = line.split(' ').map((item) => parseInt(item, DEX));
  } else if (lineNumber === 2) {
    patternSize = parseInt(line, DEX);
  } else if (lineNumber === 3) {
    pattern = line.split(' ').map((item) => parseInt(item, DEX));
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(measurements, pattern));
});