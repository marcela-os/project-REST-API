const express = require('express');
const db = require('./db');
let cors = require('cors')


const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/api', testimonialsRoutes); // add user routes to server
app.use('/api', concertsRoutes); 
app.use('/api', seatsRoutes); 


app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
