const express = require('express');
const path = require('path');
const db = require('./db');


const app = express();

app.use(express.static(path.join(__dirname, '/testimointials')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.get('/', (req, res) => {
  res.json(db.testimonials);
});

app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

app.get('/seats', (req, res) => {
  res.json(db.seats);
});

app.get('/random', (req, res) => {
  const random = db.testimonials[Math.floor(Math.random() * (db.testimonials).length) + 1];
  console.log(random);
  res.json({ random });
});

app.get('/:id', (req, res) => {
  res.json(db.testimonials.find(item => item.id == req.params.id));
});

app.get('/concerts/:id', (req, res) => {
  res.json(db.concerts.find(item => item.id == req.params.id));
});

app.get('/seats/:id', (req, res) => {
  res.json(db.seats.find(item => item.id == req.params.id));
});

app.post('/', (req, res) => {
  const { author, text } = req.body;
  const id = Math.floor(Math.random() + 99);
  db.testimonials.push({ id, author, text });
  res.json({ message: 'OK' });
});

app.post('/concerts', (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = Math.floor(Math.random() + 99);
  db.concerts.push({ id, performer, genre, price, day, image });
  res.json({ message: 'OK' });
});

app.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;
  const id = Math.floor(Math.random() + 99);
  db.seats.push({ id, day, seat, client, email });
  res.json({ message: 'OK' });
});

app.put('/:id', (req, res) => {
  const testimonials = db.testimonials.find(item => item.id == req.params.id);
  testimonials.author = req.body.author;
  testimonials.text = req.body.text;
  res.json({ message: 'OK' });
});


app.put('/concerts/:id', (req, res) => {
  const concerts = db.concerts.find(item => item.id == req.params.id);
  concerts.performer = req.body.performer;
  concerts.genre = req.body.genre;
  concerts.price = req.body.price;
  concerts.day = req.body.day;
  concerts.image = req.body.image;
  res.json({ message: 'OK' });
});

app.put('/seats/:id', (req, res) => {
  const seats = db.seats.find(item => item.id == req.params.id);
  seats.day = req.body.day;
  seats.seat = req.body.seat;
  seats.client = req.body.client;
  seats.email = req.body.email;
  res.json({ message: 'OK' });
});

app.delete('/:id', (req, res) => {
  let index = db.testimonials.find(item => item.id === req.query.id);
  db.testimonials.splice(index, 1);
  res.json({ message: 'OK' });
});

app.delete('/concerts/:id', (req, res) => {
  let index = db.concerts.find(item => item.id === req.query.id);
  db.concerts.splice(index, 1);
  res.json({ message: 'OK' });
});

app.delete('/seats/:id', (req, res) => {
  let index = db.seats.find(item => item.id === req.query.id);
  db.seats.splice(index, 1);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
