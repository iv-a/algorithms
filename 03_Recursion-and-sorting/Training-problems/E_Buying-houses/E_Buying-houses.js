const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });
let _curLine = 0;
const CONSTANTS = {
  RADIX: {
    DEC: 10,
  }
};

let numberOfHouses, budget, prices;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    [ numberOfHouses, budget ] = getArrayOfInt(line);
  } else if (_curLine === 1) {
    prices = getArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  print(countHousesToBuy(numberOfHouses, budget, prices));
})

function compareFn(a, b) {
  return a - b;
}

function countHousesToBuy(numberOfHouses, budget, prices) {
  prices.sort(compareFn);
  let housesToBuyCounter = 0;
  let sum = 0;
  while (housesToBuyCounter < numberOfHouses) {
    sum += prices[housesToBuyCounter];
    if (sum > budget) {
      break;
    }
    housesToBuyCounter++;
  }
  return housesToBuyCounter;
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