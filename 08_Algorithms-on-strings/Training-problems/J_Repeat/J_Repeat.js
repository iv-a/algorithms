const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

function prefixFunctionCounter(string) {
  const p = new Array(string.length).fill(0);
  for (let i = 1; i < string.length; i++) {
    let k = p[i - 1];
    while (k > 0 && string[k] !==string[i]) {
      k = p[k - 1]
    }
    if (string[k] === string[i]) {
      k += 1;
    }
    p[i] = k;
  }
  return p.join(' ');
}

io_interface.on('line', function (line) {
  console.log(prefixFunctionCounter(line));
});