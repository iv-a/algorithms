function findLIS(n, arr) {
  const dp = new Array(n + 1).fill(Infinity);
  const pos = new Array(n + 1);
  const prev = new Array(n);
  let length = 0;

  pos[0] = -1;
  dp[0] = -Infinity;
  for (let i = 0; i < n; i++) {
    let j = binarySearch(dp, arr[i]);
    if (dp[j - 1] < arr[i] && arr[i] < dp[j]) {
      dp[j] = arr[i];
      pos[j] = i;
      prev[i] = pos[j - 1];
      length = Math.max(length, j);
    }
  }

  let p = pos[length];
  const ans = [];
  while (p != -1) {
    ans.push(p + 1);
    p = prev[p];
  }
  ans.reverse();
  return [length, ans];
}

function binarySearch(arr, value) {
  let left = 0;
  let right = arr.length - 1;
  while (left !== right) {
    let middle = (left + right) >> 1;
    if (arr[middle] < value) {
      left = middle + 1;
    } else  {
      right = middle;
    }
  }
  return right;
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let n;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    n = parseInt(line, 10);
  } else if (lineNumber === 1) {
    const [length , ans] = findLIS(n, line.split(' ').map((item) => parseInt(item, 10)));
    console.log(length);
    console.log(ans.join(' '));
  }
  lineNumber++;
});


// const arr = [1, 1, 1, 2, 3, 4, 6, 6, 7, 7];
//
// console.log(binarySearch(arr, 7));

// const n = 5;
// const arr = [4, 2, 9, 1, 13];
// const n = 6;
// const arr = [1, 2, 4, 8, 16, 32];
// console.log(findLIS(n, arr));