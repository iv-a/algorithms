const readline = require('readline');
const io_interface = readline.createInterface({input: process.stdin});

let lineNumber = 0;
let numberOfClasses;
const classes = [];

function comparator(a, b) {
  const [ startTimeA, endTimeA ] = a;
  const [ startTimeB, endTimeB ] = b;
  if (endTimeA > endTimeB) {
    return 1;
  } else if (endTimeA < endTimeB) {
    return -1;
  } else {
    return startTimeA - startTimeB;
  }
}

function getOptimalClasses(classes) {
  classes.sort(comparator);
  const ans = [];
  let addedLessonStarts, addedLessonEnds;
  for (let i = 0; i < classes.length; i++) {
    const [ start, end ] = classes[i];
    if (i === 0) {
      ans.push(classes[i]);
      addedLessonStarts = start;
      addedLessonEnds = end;
    } else {
      if (start >= addedLessonEnds) {
        ans.push(classes[i]);
        addedLessonStarts = start;
        addedLessonEnds = end;
      }
    }
  }
  return ans;
}

// function getClasses(line) {
//   const [ startTime, endTime ] = line.split(' ');
//   let [ startHour, startMinute = '' ] = startTime.split('.');
//   let [ endHour, endMinute = '' ] = endTime.split('.');
//   if (startMinute.length < 2) startMinute += '0';
//   if (endMinute.length < 2) endMinute += '0';
//   const start = parseInt(startHour, 10) * 60 + parseInt(startMinute);
//   const end = parseInt(endHour, 10) * 60 + parseInt(endMinute);
//   classes.push([start, end]);
// }

io_interface.on('line', function (line) {
  if (lineNumber === 0) {
    numberOfClasses = parseInt(line, 10);
  } else if (lineNumber <= numberOfClasses) {
    const [ startTime, endTime ] = line.split(' ');
    classes.push([Number(startTime), Number(endTime)]);
  }
  lineNumber++;
});

io_interface.on('close', function () {
  const ans = getOptimalClasses(classes);
  console.log(ans.length);
  ans.forEach((item) => {
    process.stdout.write(item.join(' ') + '\n');
  })
});