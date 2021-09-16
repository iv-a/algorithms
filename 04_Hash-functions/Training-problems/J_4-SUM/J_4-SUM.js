const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

function fourSum(numbers, target) {
  const len = numbers.length;
  const res = [];
  let l = 0;
  let r = 0;
  let sum = 0;

  numbers.sort((a, b) => a - b);

  for (let i = 0; i < len - 3; i++) {
    if (i > 0 && numbers[i] === numbers[i - 1]) continue;
    if (numbers[i] + numbers[i + 1] + numbers[i + 2] + numbers[i + 3] > target) break;
    if (numbers[i] + numbers[len - 1] + numbers[len - 2] + numbers[len - 3] < target) continue;

    for (let j = i + 1; j < len - 2; j++) {
      if (j > i + 1 && numbers[j] === numbers[j - 1]) continue;
      if (numbers[i] + numbers[j] + numbers[j + 1] + numbers[j + 2] > target) break;
      if (numbers[i] + numbers[j] + numbers[len - 1] + numbers[len - 2] < target) continue;

      l = j + 1;
      r = len - 1;

      while (l < r) {
        sum = numbers[i] + numbers[j] + numbers[l] + numbers[r];

        if (sum < target) {
          l++;
        } else if (sum > target) {
          r--;
        } else  {
          res.push([numbers[i], numbers[j], numbers[l], numbers[r]]);
          while (l < r && numbers[l] === numbers[l + 1]) l++;
          while (l < r && numbers[r] === numbers[r - 1]) r--;
          l++;
          r--;
        }
      }
    }
  }
  return res;
}

let lineNumber = 0;
let n, target;

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    n = Number(line);
  } else if (lineNumber === 1) {
    target = Number(line);
  } else {
    const input = line.split(' ').map(Number);
    input.sort((a, b) => a - b);
    const res = fourSum(input, target);
    console.log(res.length);
    for (let quadruplet of res) {
      console.log(quadruplet.join(' '));
    }
  }
  lineNumber++;
});