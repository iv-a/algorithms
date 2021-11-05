function solution(originalString, substrings) {
  substrings.sort(comparator);
  let counter = 0;
  const ans = [];
  substrings.forEach((item, i) => {
    let [ substring, position ] = item;
    ans.push(originalString.slice(counter, position));
    ans.push(substring);
    counter = position;
  });
  if (counter < originalString.length) {
    ans.push(originalString.slice(counter));
  }
  return ans.join('');
}

// function insertSubstring(string, substring, index) {
//   const length = string.length;
//   const shift = substring.length;
//   if (length > 0) {
//     for (let i = length - 1; i >= index; i--) {
//       string[shift + i] = string[i];
//     }
//   }
//   for (let i = 0; i <= shift - 1; i++) {
//     string[index + i] = substring[i];
//   }
// }
//
function comparator(a, b) {
  return a[1] - b[1];
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfStrings;
const DEX = 10;
const substrings = [];
let originalString;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    originalString = line;
  } else if (lineNumber === 1) {
    numberOfStrings = parseInt(line, DEX);
  } else if (lineNumber <= numberOfStrings + 1) {
    const [ substring, position ] = line.split(' ');
    substrings.push([substring, parseInt(position, DEX)]);
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(originalString, substrings));
});