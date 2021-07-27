const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
}

let rows, columns, targetRow, targetColumn;
const matrix = [];

_rl.on('line', (line) => {
  if (_curLine === 0) {
    rows = readInt(line);
  } else if (_curLine === 1) {
    columns = readInt(line);
  } else if (_curLine < rows + 2) {
    matrix.push(readArrayOfInt(line));
  } else if (_curLine === rows + 2) {
    targetRow = readInt(line);
  } else if (_curLine === rows + 3) {
    targetColumn = readInt(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(getNeighbours(rows, columns, matrix, targetRow, targetColumn));
});

function getNeighbours(rows, columns, matrix, targetRow, targetColumn) {
  const neighbours = [];
  if (targetColumn < columns - 1) {
    neighbours.push(matrix[targetRow][targetColumn + 1]);
  }
  if (targetRow < rows - 1) {
    neighbours.push(matrix[targetRow + 1][targetColumn]);
  }
  if (targetColumn > 0) {
    neighbours.push(matrix[targetRow][targetColumn - 1]);
  }
  if (targetRow > 0) {
    neighbours.push(matrix[targetRow - 1][targetColumn]);
  }
  return neighbours.sort((a, b) => a - b).join(' ');
}

function readInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function readArrayOfInt(line) {
  return line.trim().split(' ').map((num) => parseInt(num, CONSTANTS.RADIX.DEC));
}
