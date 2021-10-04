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
  const vertices = new Array(++numberOfVertices);
  pairs.forEach((pair) => {
    const [ vertexFrom, vertexTo ] = pair;
    if (vertices[parseInt(vertexFrom, 10)] === undefined) {
      vertices[parseInt(vertexFrom, 10)] = [vertexTo];
    } else {
      vertices[parseInt(vertexFrom, 10)].push(vertexTo);
    }
  });
  for (let i = 1; i < vertices.length; i++) {
    if (vertices[i] === undefined) {
      console.log(0);
    } else {
      vertices[i].sort((a, b) => a - b);
      // console.log('' + vertices[i].length + vertices[i].join(' '));
      console.log(`${vertices[i].length} ${vertices[i].join(' ')}`);
    }
  }
}

io_interface.on('close', function () {
  convert(pairs, numberOfVertices);
});