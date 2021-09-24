function numberOfDFT(n) {
  let ans = 1;
  for (let i = 1; i <= n; i++) {
    ans *= (4 * i - 2);
    ans /= (i + 1);
  }
  console.log(ans);
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

io_interface.on('line', function (line) {
  numberOfDFT(Number(line));
});