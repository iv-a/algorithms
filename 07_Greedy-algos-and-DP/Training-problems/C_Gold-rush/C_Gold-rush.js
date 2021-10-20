function solution(capacity, heaps) {
  let sum = 0, iterator = 0, totalWeight = 0;
  heaps.sort(comparator);
  while (totalWeight <= capacity && iterator < heaps.length) {
    let [ cost, weight ] = heaps[iterator];
    if (capacity - totalWeight >= weight) {
      totalWeight += weight;
      sum += cost * weight;
    } else {
      sum += cost * (capacity - totalWeight);
      totalWeight += (capacity - totalWeight);
    }
    iterator++;
  }
  return sum;
}

function comparator(a, b) {
  return b[0] - a[0];
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let capacity, numberOfHeaps;
const heaps = [];
const DEX = 10;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    capacity = parseInt(line, DEX);
  } else if (lineNumber === 1) {
    numberOfHeaps = parseInt(line, DEX);
  } else if (lineNumber <= numberOfHeaps + 1) {
    const [ cost, weight ] = line.split(' ').map((item) => parseInt(item, DEX));
    heaps.push([cost, weight]);
  }
  lineNumber++;
});

io_interface.on('close', function () {
  console.log(solution(capacity, heaps));
});