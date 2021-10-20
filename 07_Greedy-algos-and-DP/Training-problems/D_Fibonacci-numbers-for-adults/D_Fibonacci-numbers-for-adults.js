function fibonacci(n) {
  const dp = new Array(n + 1);
  dp[0] = 1;
  dp[1] = 1;
  let i = 2;
  while (i <= n) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % (10 ** 9 + 7);
    i++;
  }
  return dp[n];
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

io_interface.on('line', function (line) {
  console.log(fibonacci(parseInt(line, 10)));
});