const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;
let matrix = '';

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
}

let possibility, numbers;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    possibility = readInt(line);
  } else if (_curLine >= 1 && _curLine < 4) {
    matrix += line;
  } else if (_curLine === 4) {
    matrix += line;
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(getScore(possibility, matrix));
});

function getScore(enabledButtons, matrix) {
  const numbers = matrix.match(/\d/g);
  const activeButtons = new Map();
  if (numbers) {
    for (let num of numbers) {
      const score = activeButtons.get(num);
      if (score) {
        activeButtons.set(num, score + 1);
      } else {
        activeButtons.set(num, 1);
      }
    }
  }
  let score = 0;
  for (let value of activeButtons.values()) {
    if (value <= 2 * possibility) {
      score++;
    }
  }
  return score.toString();
}

function readInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}
