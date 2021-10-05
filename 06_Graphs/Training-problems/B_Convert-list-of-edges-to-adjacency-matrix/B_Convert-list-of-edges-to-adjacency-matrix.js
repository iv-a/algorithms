const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfVertices, numberOfEdges;
const pairs = [];

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    [ numberOfVertices, numberOfEdges ] = line.split(' ');
  } else if (lineNumber < ++numberOfEdges) {
    pairs.push(line.split(' '));
  }
  lineNumber++;
});

function convert(pairs, numberOfVertices) {
  const matrix = [...Array(parseInt(numberOfVertices, 10))].map(() => Array(parseInt(numberOfVertices, 10)).fill(0));
  pairs.forEach((pair) => {
    const [vertexFrom, vertexTo] = pair;
    matrix[parseInt(vertexFrom, 10) - 1][parseInt(vertexTo, 10) - 1] = 1;
  });
  matrix.forEach((row) => {
    console.log(row.join(' '));
  });
}

io_interface.on('close', function () {
  convert(pairs, numberOfVertices);
});