const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;
const CONSTANTS = {
  RADIX: {
    DEC: 10,
  }
};

let numberOfSegments, segments;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfSegments = getInt(line);
  } else if (_curLine === 1) {
    segments = getArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  print(maxPerimeter(numberOfSegments, segments));
})

function compareFn(a, b) {
  return b - a;
}

function maxPerimeter(numberOfSegments, segments) {
  segments.sort(compareFn);
  let i = 0;
  while (i + 2 < numberOfSegments) {
    if (segments[i] < segments[i + 1] + segments[i + 2]) {
      break;
    } else {
      i++;
    }
  }
  return segments[i] + segments[i + 1] + segments[i + 2];
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArrayOfInt(line) {
  return line.split(' ').map((item) => getInt(item));
}

function print(text) {
  process.stdout.write(text.toString() + '\n');
}