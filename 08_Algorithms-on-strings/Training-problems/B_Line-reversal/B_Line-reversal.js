function solution(line) {
  return line.split(' ').reverse().join(' ');
}

const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

io_interface.on('line', function (line) {
  console.log(solution(line));
});