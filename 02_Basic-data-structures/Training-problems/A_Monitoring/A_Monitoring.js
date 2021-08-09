const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
}

let rows, columns;
const matrix = [];

_rl.on('line', (line) => {
  if (_curLine === 0) {
    rows = readInt(line);
  } else if (_curLine === 1) {
    columns = readInt(line);
  } else if (_curLine < rows + 1) {
    matrix.push(line);
  } else  if (_curLine === rows + 1) {
    matrix.push(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(transpose(rows, columns, matrix.join(' ').split(' ')));
});

function transpose(rows, columns, matrix) {
  const transposedMatrix = [];
  for (let i = 0; i < columns; i++) {
    const newRow = [];
    for (let j = i; j < matrix.length; j += columns) {
      newRow.push(matrix[j]);
    }
    transposedMatrix.push(newRow.join(' '));
  }
  return transposedMatrix.join('\n');
}

function readInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}