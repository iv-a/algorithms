const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });
let _curLine = 0;
const CONSTANTS = {
  RADIX: {
    DEC: 10,
  }
};

let kidsNumber, greedFactor, cookiesNumber, cookies;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    kidsNumber = getInt(line);
  } else if (_curLine === 1) {
    greedFactor = getArrayOfInt(line);
  } else if (_curLine === 2) {
    cookiesNumber = getInt(line);
  } else if (_curLine === 3) {
    cookies = getArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  print(happyKidsCount(kidsNumber, greedFactor, cookiesNumber, cookies));
})

function compareFn(a, b) {
  return a - b;
}

function happyKidsCount(kidsNumber, greedFactor, cookiesNumber, cookies) {
  greedFactor.sort(compareFn);
  cookies.sort(compareFn);
  let kid = 0, cookie = 0;
  let happyKidsNumber = 0;

  while (kid < kidsNumber && cookie < cookiesNumber) {
    if (greedFactor[kid] <= cookies[cookie]) {
      happyKidsNumber++;
      kid++;
      cookie++;
    } else {
      cookie++;
    }
  }
  return happyKidsNumber;
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