const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfStrings;
const DEX = 10;
const strings = [];

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfStrings = parseInt(line, DEX);
  } else if (lineNumber <= numberOfStrings) {
    strings.push(line);
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(numberOfStrings, strings));
});

function solution(numberOfStrings, strings) {
  let min = 0;
  for (let i = 1; i < numberOfStrings; i++) {
    if (strings[i].length < strings[min].length) {
      min = i;
    }
  }
  for (let i = 0; i <= strings[min].length; i++) {
    for (let j = 1; j < numberOfStrings; j++) {
      let sym = strings[0][i];
      if (strings[j][i] !== sym) {
        return i;
      }
    }
  }
  return strings[min].length;
}