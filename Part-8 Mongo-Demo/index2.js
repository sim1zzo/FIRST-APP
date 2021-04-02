const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDb...'))
  .catch(err => console.error("Cannot connect ", err))


const courseSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  author: String,
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);



async function getAllBackEndCourses() {
  return await Course
    .find()
    .and([{ tags: 'backend' }, { isPublished: true }])
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}



async function getAllCourses() {
  return await Course
    .find({ isPublished: true, tags:{$in:['frontend', 'backend']} })
    .sort('-price') // === to ,sort({price:-1})
    .select('name author price') // === .select({name:1, author:1})
}

async function getCourseUnderFifteen(){
  return await Course
    .find({ isPublished: true })
    .or([
      { price: { $gt: 40 } },
      { name: /.*by.*/i }
  ])
}


async function run() {
  // const backendCourses = await getAllBackEndCourses();
  // console.log(backendCourses);
  // const allCourses = await getAllCourses();
  // console.log(allCourses);
  const course = await getCourseUnderFifteen();
  console.log(course);
}

async function updateCourse(id) {
  try {
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = true;
    course.author = 'Another author';
    // course.set({
    //   isPublished: true,
    //   author: "Another author"
    // });
    const result =  await course.save();
    console.log(result);
  } catch (error) {
    console.error("Error ", error);
  }

}


async function updateCourseFirst(id) {
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      author: 'Mosh Hamedhani',
      isPublished: false
    }
  }, { new: true});
  console.log(course);
}

// updateCourse('60650b41c47a8680b73b5141');

// updateCourseFirst('60650b41c47a8680b73b5141');


async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

removeCourse('60650b41c47a8680b73b5141');