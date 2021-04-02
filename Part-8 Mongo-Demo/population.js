const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=> console.log('✅ Connection established with MongoDB!'))
  .catch(error => console.error("❌ Could not connecto to MongoDB...", error));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const course = await Course
    .find()
    .populate('author', 'name -_id')
    .select('name author');
  console.log(course);
}

// createAuthor('Simone', 'Nodejs instruction as a bio', '@sim1zzo');
// createCourse('Node Course', '6066e0b354108d6ae9689046');
listCourses();