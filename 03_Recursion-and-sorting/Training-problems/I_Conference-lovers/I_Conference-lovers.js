const _readline = require('readline');
const _rl = _readline.createInterface({ input: process.stdin });

let _curLine = 0;
const CONSTANTS = {
  RADIX: {
    DEC: 10,
  }
};

let numberOfStudents, students, numberOfUniversities;

_rl.on('line', (line) => {
  if (_curLine === 0) {
    numberOfStudents = getInt(line);
  } else if (_curLine === 1) {
    students = getArrayOfInt(line);
  } else if (_curLine === 2) {
    numberOfUniversities = getInt(line);
    _rl.close();
  }
  _curLine++;
})

_rl.on('close', () => {
  print(getTopUniversities(numberOfStudents, students, numberOfUniversities));
})

function compareFn(itemA, itemB) {
  const [ idA, countA ] = itemA;
  const [ idB, countB ] = itemB;
  if (countA - countB > 0) {
    return -1;
  } else if (countA - countB === 0) {
    return idA - idB;
  } else {
    return 1;
  }
}

function getTopUniversities(numberOfStudents, students, numberOfUniversities) {
  const universities = new Map();
  for (let student of students) {
    const count = universities.get(student);
    if (count) {
      universities.set(student, count + 1);
    } else {
      universities.set(student, 1);
    }
  }
  const topUniversities = Array.from(universities).sort(compareFn);
  const result = [];
  for (let i = 0; i < numberOfUniversities; i++) {
    result.push(topUniversities[i][0]);
  }

  return result.join(' ');
}

function getInt(line) {
  return parseInt(line, CONSTANTS.RADIX.DEC);
}

function getArrayOfInt(line) {
  return line.split(' ').map((item) => getInt(item));
}

function print(text) {
  process.stdout.write(text.toString() + '\n');
}