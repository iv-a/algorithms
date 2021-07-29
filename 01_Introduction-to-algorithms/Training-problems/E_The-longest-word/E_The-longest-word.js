const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;

const CONSTANTS = {
  RADIX: {
    DEC: 10,
  },
}

let textLength, text;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    textLength = getInt(line);
  } else if (_curLine === 1) {
    text = getArrayOfWords(line);
    _rl.close();
  }
  _curLine++;
});

_rl.on('close', () => {
  process.stdout.write(getLongestWord(textLength, text));
});

function getLongestWord(textLength, text) {
  let longestWord = text[0];
  for (let word of text) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }
  return [longestWord, longestWord.length].join('\n');
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArrayOfWords(line) {
  return line.trim().split(' ');
}
