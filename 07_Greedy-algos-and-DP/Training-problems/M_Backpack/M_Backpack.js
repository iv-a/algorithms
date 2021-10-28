const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfItems, capacity;
const items = [];

const dex = 10;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    [ numberOfItems, capacity ] = line.split(' ').map((item) => parseInt(item, dex));
  } else if (lineNumber <= numberOfItems) {
    items.push(line.split('').map((item) => parseInt(item, dex)));
  }
  lineNumber++;
});

io_interface.on('close', function () {

});

function solution(numberOfItems, capacity, items) {
  const dp = [...Array(numberOfItems)].map(() => Array(capacity));
}
