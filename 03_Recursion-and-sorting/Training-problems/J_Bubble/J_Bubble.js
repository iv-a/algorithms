const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  }
};

let size, array;

let _curLine = 0;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    size = getInt(line);
  } else if (_curLine === 1) {
    array = getArrayOfInt(line);
    bubbleSort(array)
    _rl.close();
  }
  _curLine++;
});

function bubbleSort(array) {
  let i = 0;
  let isSorted = false;
  while (!isSorted) {
    isSorted = true;
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        isSorted = false;
      }
    }
    if (!isSorted || (isSorted && !i)) {
      print(array.join(' '));
    }
    i++;
  }
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArrayOfInt(line) {
  return line.split(' ').map((item) => getInt(item));
}

function print(text) {
  process.stdout.write(text + '\n');
}