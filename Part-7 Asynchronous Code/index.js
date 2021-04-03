 // this is a synchronous (blocking) programming block
// console.lo('first');
// console.lo('second');


// async does not mean concurrent or multithread.




console.log('Before');
// getUser(1, user => {
//   console.log('User: ' + JSON.stringify(user));
//   getRepositories(user.githubHusername, (repos) => {
//     console.log('Repos: ' + JSON.stringify(repos))
//   })
// });
// console.log(user);

// Promises based approach
// getUser(1)
//   .then((user) => getRepositories(user.githubHusername))
//   .then((repos) => getCommits(repos[0]))
//   .then((commits) => console.log('Commits: ' + JSON.stringify(commits)))
//   .catch((err) => console.log('Error: ' + err.message));

// Async and await approach to
async function dispalyCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.githubHusername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (error) {
    console.log("Error ", error);
  }
};

dispalyCommits();
console.log('After');


function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, githubHusername: 'sim1zzo' });
    }, 2000);
  })
};

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling github API');
      resolve(['repo1','repo2','repo3','repo4']);
    }, 2000);
  })
};

function getCommits(repos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling github API');
      resolve(['commit']);
    });
  });
}

