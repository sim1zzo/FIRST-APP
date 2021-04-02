const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDb...'))
  .catch(err => console.error("Cannot connect ", err));


const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLenght: 5,
    maxLenght: 255,
    trim:true
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network','computer science'],
    lowercase:true
  },
  author: String,
  tags: {
    type: Array,
    // validate: {
    //   validator: () => {
    //     setTimeout(() => {
    //       Promise.resolve(false);
    //       message: 'A course should have at least one tag'
    //     },4000)
    //   },
    // },
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message:'A course should have at least one tag'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () { return this.isPublished },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Algorithms and data structures   ",
    category:'computer science',
    author: "Sim1zzo",
    tags: ['CS'],
    isPublished: true,
    price: 20.90
  });

  try {
      const result = await course.save();
      console.log(result);
    }catch (error) {
    console.error("Something went wrong", error.message);
  }
}

async function getAllCourses() {
  const courses = await Course.find();
  console.log(courses);
}; 


async function getSimoneCourses() {
  const courses = await Course
    // .find({ author: "Simone", isPublished: true })
    .find()
    .or([{author:'Simone'}, {isPublished: true}])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function getSpecificCourse(id) {
  const course = await Course
    .find({ _id: id })
    .sort('name')
    .select('name tags price');
  console.log(course[0].price);
}

// getSimoneCourses();

// getAllCourses();

// createCourse();

getSpecificCourse('60650a8399adc07e9da291c6');