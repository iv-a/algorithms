const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;
const CONSTANTS = {
  RADIX: {
    DEC: 10,
  }
};

let numberOfDays, days, cost;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfDays = getInt(line);
  } else if (_curLine === 1) {
    days = getArray(line);
  } else if (_curLine === 2) {
    cost = getInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  const result = [];
  result.push(getTheDay(days, cost, 0, numberOfDays));
  result.push(getTheDay(days, cost * 2, 0, numberOfDays));
  print(result);
})

function getTheDay(array, cost, left, right) {
  if (right <= left ) {
    return -1
  }
  const mid = (left + right) >> 1;
  if (getInt(array[mid]) >= cost && getInt(array[mid - 1]) < cost || mid === 0) {
    return mid + 1;
  } else if (getInt(array[mid]) < cost) {
    return getTheDay(array, cost, mid + 1, right);
  } else {
    return getTheDay(array, cost, left, mid);
  }
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArray(line) {
  return line.split(' ');
}

function print(text) {
  process.stdout.write(text.join(' ') + '\n');
}