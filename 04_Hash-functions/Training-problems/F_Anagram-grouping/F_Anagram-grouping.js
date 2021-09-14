const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

function isAnagram(array, numberOfStrings) {
  const map = new Map();
  for (let i = 0; i < numberOfStrings; i++) {
    let sortedStr = array[i].split('').sort().join('');
    let value = map.get(sortedStr) ;
    if (!value) {
      value = [];
      value.push(i);
      map.set(sortedStr, value);
    } else {
      value.push(i);
      map.set(sortedStr, value);
    }
  }
  return map;
}

let lineNumber = 0;
let numberOfStrings, arrayOfStrings;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfStrings = Number(line);
  } else {
    arrayOfStrings = line.split(' ');
    for (let value of isAnagram(arrayOfStrings, numberOfStrings).values()) {
      console.log(value.join(' '));
    }
  }
  lineNumber++;
});