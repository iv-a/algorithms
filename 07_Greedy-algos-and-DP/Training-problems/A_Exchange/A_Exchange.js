function removeDuplicates(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const current = parseInt(arr[i], 10);
    const right = parseInt(arr[i + 1], 10);
    if (current !== right) {
      newArr.push(current);
    }
  }
  if (arr[arr.length - 1] !== newArr[newArr.length - 1]) newArr.push(arr[arr.length - 1]);
  return newArr;
}

function solution(arr) {
  let sum = 0;
  for (let i = 1; i < arr.length - 1; i++) {
    const left = parseInt(arr[i - 1], 10);
    const current = parseInt(arr[i], 10);
    const right = parseInt(arr[i + 1], 10);
    if (i - 1 === 0 && left < current) {
      sum -= left;
    }
    if (current < left && current < right) {
      sum -= current;
    }
    if (current > left && current > right) {
      sum += current;
    }
    if (i + 1 === arr.length - 1 && current < right) {
      sum += right;
    }
  }
  return sum;
}



const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfDays;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfDays = parseInt(line, 10);
  } else if (lineNumber === 1) {
    console.log(solution(removeDuplicates(line.split(' '))));
  }
  lineNumber++;
});

// const a1 = [1, 1, 1, 3, 4, 4, 5, 5, 5];
// const a2 = [7, 1, 5, 3, 6, 4];
// // console.log(removeDuplicates(a2));
// // console.log(removeDuplicates(a1));
// console.log(solution(removeDuplicates(a1)));
// console.log(solution(removeDuplicates(a2)));
