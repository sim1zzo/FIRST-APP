
let url = 'http://mylogger.io/log';

function log(message){
  console.log(message);
}


// module.exports.log = log; // in this way we can export an object
module.exports = log; // in this way we can export a function 


// module.exports.url = url;
// module.exports.endPoint = url;