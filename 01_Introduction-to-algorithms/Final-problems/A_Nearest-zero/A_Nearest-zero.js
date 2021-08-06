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

let length, street;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    length = getInt(line);
  } else if (_curLine === 1) {
    street = line.split(' ');
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(solution(length, street));
});

function solution(length, street) {
  const dp = new Array(length).fill(0);
  let zeroDetected = false;
  let leftZero;
  let counter = 0;
  for (let i = 0; i < length; i++) {
    if (street[i] === '0') {
      if (!zeroDetected) {
        leftZero = i;
      }
      zeroDetected = true;
      counter = 0;
    }
    if (zeroDetected) {
      dp[i] = counter;
      counter++;
    }
  }
  zeroDetected = false;
  for (let i = length - 1; i >= leftZero; i--) {
    if (street[i] === '0') {
      zeroDetected = true;
      counter = 0;
    }
    if (zeroDetected) {
      dp[i] = Math.min(dp[i], counter);
      counter++;
    }
  }
  counter = 0;
  for (let i = leftZero; i >= 0; i--) {
    dp[i] = counter;
    counter++;
  }
  return dp.join(' ');
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}
