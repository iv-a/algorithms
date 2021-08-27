const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;
const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
};

let numberOfItems, wardrobe;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfItems = getInt(line);
  } else if (_curLine === 1) {
    wardrobe = getArrayOfInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  print(sortWardrobe(numberOfItems, wardrobe))
})

function sortWardrobe(numberOfItems, wardrobe) {
  const counts = [[], [], []];
  for (let i = 0;  i < numberOfItems; i++) {
    counts[wardrobe[i]].push(wardrobe[i]);
  }
  return counts[0].concat(counts[1], counts[2]);
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArrayOfInt(line) {
  return line.split(' ').map((item) => getInt(item));
}

function print(text) {
  process.stdout.write(text.join(' ') + '\n');
}