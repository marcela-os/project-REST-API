const express = require('express');
//const db = require('./db');
const cors = require('cors')
const path = require('path');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/api', testimonialsRoutes); // add user routes to server
app.use('/api', concertsRoutes); 
app.use('/api', seatsRoutes); 


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

