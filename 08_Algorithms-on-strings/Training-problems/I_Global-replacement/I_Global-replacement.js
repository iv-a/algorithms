function findPattern(text, pattern) {
  const result = [];
  const string = pattern + '#' + text;
  const p = new Array(string.length).fill(0);
  let previousP = 0;
  for (let i = 1; i < string.length; i++) {
    let k = previousP;
    while (k > 0 && string[k] !==string[i]) {
      k = p[k - 1]
    }
    if (string[k] === string[i]) {
      k += 1;
    }
    if (i < pattern.length) {
      p[i] = k;
    }
    previousP = k;
    if (k === pattern.length) {
      result.push(i - 2 * pattern.length);
    }
  }
  return result;
}

function insertString(originalString, string, index, pattern) {
  const newString = originalString.slice(0, index) + string + originalString.slice(index + pattern.length);
  return newString;
}

function solution(originalString, pattern, string) {
  const positions = findPattern(originalString, pattern);
  let i = 0;
  for (let position of positions) {
    originalString = insertString(originalString, string, position + i, pattern);
    i += string.length - pattern.length;
  }
  return originalString;
}

// console.log(findPattern('ng', 'pingpong'));
const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let originalString, pattern, string;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    originalString = line;
  } else if (lineNumber === 1) {
    pattern = line;
  } else if (lineNumber === 2) {
    string = line;
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(originalString, pattern, string));
});