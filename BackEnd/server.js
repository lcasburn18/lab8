const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String,
});

const movieModel = mongoose.model('myMovies', movieSchema);

// Fetch all movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await movieModel.find({});
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).send('Error fetching movies');
  }
});

// Fetch a single movie by ID
app.get('/api/movie/:id', async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
    res.json(movie);
  } catch (error) {
    res.status(400).send('Invalid ID format');
  }
});

// Add a new movie
app.post('/api/movies', async (req, res) => {
  try {
    const { title, year, poster } = req.body;
    const newMovie = new movieModel({ title, year, poster });
    await newMovie.save();
    res.status(201).json({ message: 'Movie Added!', movie: newMovie });
  } catch (error) {
    res.status(500).send('Error adding movie');
  }
});

// Update a movie by ID
app.put('/api/movie/:id', async (req, res) => {
  try {
    console.log('GET /api/movie/:id called with id:', req.params.id);
    const updatedMovie = await movieModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) {
      return res.status(404).send('Movie not found');
    }
    res.json(updatedMovie);
  } catch (error) {
    console.log('Error in PUT /api/movie/:id:', error.message);
    res.status(400).send('Invalid ID format or request body');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
