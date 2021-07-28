const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
}

let period, temperatureValues;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    period = readInt(line);
  } else if (_curLine === 1) {
    temperatureValues = readArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(getChaotic(period, temperatureValues));
});

function getChaotic(period, temperatureValues) {
  let chaotic = 0;
  if (period > 1) {
    if (temperatureValues[0] > temperatureValues[1]) {
      chaotic++;
    }
    if (temperatureValues[period - 1] > temperatureValues[period - 2]) {
      chaotic++;
    }

    for (let i = 1; i < period - 1; i++) {
      if (temperatureValues[i - 1] < temperatureValues[i] && temperatureValues[i] > temperatureValues[i + 1]) {
        chaotic++;
      }
    }
  } else if (period === 1) {
    chaotic++;
  }
  return chaotic.toString();
}

function readInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function readArrayOfInt(line) {
  return line.trim().split(' ').map((num) => parseInt(num, CONSTANTS.RADIX.DEC));
}
