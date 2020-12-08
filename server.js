const express = require('express');
const path = require('path');


const app = express();

app.use(express.static(path.join(__dirname, '/testimointials')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Amanda Smith', text: 'It’s Better than Money.' },
  { id: 4, author: 'JKatrin Smith', text: 'This company is worth every coin!' },
];

app.get('/', (req, res) => {
  res.json(db);
});
app.get('/random', (req, res) => {
  const random = db[Math.floor(Math.random() * db.length) + 1];
  console.log(random);
  res.json({ random });
});

app.get('/:id', (req, res) => {
  res.json(db.find(item => item.id == req.params.id));
});

app.post('/', (req, res) => {
  const { author, text } = req.body;
  const id = Math.floor(Math.random() + 99);
  db.push({ id, author, text });
  res.json({ message: 'OK' });
});

app.put('/:id', (req, res) => {
  const testimonials = db.find(item => item.id == req.params.id);
  testimonials.author = req.body.author;
  testimonials.text = req.body.text;
  res.json({ message: 'OK' });
});

app.delete('/:id', (req, res) => {
  let index = db.find(item => item.id === req.query.id);
  db.splice(index, 1);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
