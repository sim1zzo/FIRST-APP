function getCustomer(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Waiting to get a customer');
      resolve({ id: 1, name: 'Simone Izzo', isGold: true, email: 'cazziMiei@gmail.com' });
    }, 4000);
  });
};

function getMovies() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
};

function sendEmail(email, movies) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
};

async function displayMovies() {
  try {
    const customer = await getCustomer(1);
    console.log('Customer ', customer);
    if (customer.isGold) {
      const movies = await getMovies();
      console.log('Top movies', movies);
      await sendEmail(customer.email, movies);
      console.log('Email sent');
    }
    else {
      console.log('You are a broke dumbass');
    }
  } catch (error) {
    console.log("Error: " + error);
  }
}

displayMovies();
