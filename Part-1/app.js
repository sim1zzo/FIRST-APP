const log = require('./logger');
const path = require('path');
const os = require('os');

let pathObj = path.parse(__filename);
let totalMemory = os.totalmem();
let freeMemory = os.freemem();

console.log(pathObj);

console.log(`Total Memory: ${totalMemory}.
Free Memory: ${freeMemory}`)


// How to work with files in Node

const fs = require('fs');

const files = fs.readdirSync('./');

console.log(files);

fs.readdir('./', (err, files) => {
  if (err) console.log('error', err);
  else console.log("Result", files);
})
