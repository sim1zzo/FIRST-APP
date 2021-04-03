// Promices

const p = new Promise((resolve, reject) => {
  // kick off some async tasks
  setTimeout(() => {
    // resolve(1);
    reject(new Error('message'));
  }, 2000);
});


p
  .then(resulter => console.log("Result " + resulter))
  .catch(err => console.log("Error " + err.message));