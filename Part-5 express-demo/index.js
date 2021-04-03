const Joi = require('joi');
const express = require('express');
const app = express();

// middlewere.
app.use(express.json());

let courses = [
  {id:1, name:'course1'},
  {id:2, name:'course2'},
  {id:3, name:'course3'},
];

app.get('/', (req, res) => {
  res.send('Forza Napoli Sempre');
});
app.get('/api/courses/', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id)); // or 1 * (req.params.id)
  if(!course) return res.status(404).send('Course with the given ID was not found.')
  res.send(course);
});

    // app.post();
app.post('/api/courses/', (req, res) => {
  
  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  
  
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});
  
// app.put();
  
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(400).send('');

  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
  })
  // app.delete();

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(x => x.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The given id was not found.');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
  })
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}...`));
  // app.listen();
  

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(course);
  
};