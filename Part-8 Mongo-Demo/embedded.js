const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground2',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(()=> console.log('✅ Connection established with MongoDB!'))
  .catch(error => console.error("❌ Could not connecto to MongoDB...", error));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);


const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema] 
}));


async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.error('An error occurred ', error.message);
  }
}

async function listCourses() {
  const course = await Course
    .find()
    .populate('authors', 'name -_id')
    .select('name authors');
  console.log(course);
}

async function updateAuthor(courseId) {
  const course = await Course.findOne({ _id: courseId });
  const update = { 'author.name': 'Smith Simone' };
  await course.updateOne(update);
}

async function addAuthor(courseId, author) {
  const course = await Course.findOne({ _id: courseId });
  if (!course) return "Not found!";

  course.authors.push(author);
  await course.save();
}


async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  if (!course) return 'Not found';
  
  const author = course.authors.id(authorId);
  author.remove();
  await course.save();
}

// createCourse('Play Football', [
//   new Author({ name: 'Francesco Totti' }),
//   new Author({ name: 'Lorenzo Insigne'})
// ])
// listCourses();
// addAuthor('6067074481cce16d3d8f9dd2', new Author({ name: 'Gennaro Gattuso' }));
// updateAuthor('6066efda33c1246c037502ab');
removeAuthor('6067074481cce16d3d8f9dd2', '6067093b7267396d5499309c');
