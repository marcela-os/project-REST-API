const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find(item => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = Math.floor(Math.random() + 99);
  db.concerts.push({ id, performer, genre, price, day, image });
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const concerts = db.concerts.find(item => item.id == req.params.id);
  concerts.performer = req.body.performer;
  concerts.genre = req.body.genre;
  concerts.price = req.body.price;
  concerts.day = req.body.day;
  concerts.image = req.body.image;
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  let index = db.concerts.find(item => item.id === req.query.id);
  db.concerts.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;