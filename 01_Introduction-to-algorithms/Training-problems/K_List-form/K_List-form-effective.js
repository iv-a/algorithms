const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
  SEPARATOR: {
    SPACE: ' ',
    NONE: '',
  }
}

let length, listForm, numB;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    length = getInt(line);
  } else if (_curLine === 1) {
    listForm = getArray(line);
  } else if (_curLine === 2) {
    numB = getInt(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(getListForm(listForm, numB));
});

function getListForm(listForm, numB) {
  const numA = getInt(listForm.join(''));
  return (numA + numB).toString().split('').join(' ');
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArray(line) {
  return line.split(' ');
}
