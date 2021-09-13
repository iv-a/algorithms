const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

function getMaxLength(line) {
  let maxLen = 0;
  let startIdx = 0;
  const symbols = new Map();

  for (let i = 0; i < line.length; i++) {
    if (symbols.has(line[i])) {
      startIdx = Math.max(startIdx, symbols.get(line[i]) + 1);
    }
    maxLen = Math.max(maxLen, i - startIdx + 1);
    symbols.set(line[i], i);
  }
  return maxLen;
}

io_interface.on('line', function (line) {
  console.log(getMaxLength(line));
});