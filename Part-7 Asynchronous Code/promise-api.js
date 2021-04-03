
// Promise are great for unit tests that
// sometimes we want to test for a promise that is already resolved or that is already rejected.

// // ALREADY RESOLVED
// const p = Promise.resolve({ id: 1 });
// p.then(result => console.log(result));

// // ALREADY rejected

// const pp = Promise.reject(new Error('this is the why something failed'));
// pp.catch(err => console.log(err.stack));


// simulation for calling google api
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Async operation 1');
    resolve(1);
  }, 2000);
});

// simulation for calling twitter api
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Async operation 2');
    resolve(2);
  }, 2000);
});


// Promise.all([p1, p2])
//   .then(result => console.log(result))
//   .catch(err => console.error(err.message));

Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.error(err.message));
