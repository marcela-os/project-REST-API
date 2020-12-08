const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const random = db.testimonials[Math.floor(Math.random() * (db.testimonials).length) + 1];
  console.log(random);
  res.json({ random });
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find(item => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const id = Math.floor(Math.random() + 99);
  db.testimonials.push({ id, author, text });
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const testimonials = db.testimonials.find(item => item.id == req.params.id);
  testimonials.author = req.body.author;
  testimonials.text = req.body.text;
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  let index = db.testimonials.find(item => item.id === req.query.id);
  db.testimonials.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;