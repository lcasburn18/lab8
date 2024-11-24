const express = require('express');
const app = express(); // Creating an instance of the Express application
const port = 4000; // Defining the port number for the server

// Enabling CORS
const cors = require('cors');
app.use(cors());

// Middleware to add headers for handling CORS-related issues
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Middleware for parsing request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting to MongoDB using Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14', {
  useNewUrlParser: true, // Use the new URL string parser
  useUnifiedTopology: true // Use the new server discovery and monitoring engine
});

// Defining a schema for the movie collection
const movieSchema = new mongoose.Schema({
  title: String, // Title of the movie
  year: String, // Release year of the movie
  poster: String, // URL of the movie's poster
});

// Creating a model for the `myMovies` collection based on the schema
const movieModel = mongoose.model('myMovies', movieSchema);

// API route to fetch all movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await movieModel.find({}); // Retrieve all movies from the database
    res.status(200).json({ movies }); // Send the movies in JSON format
  } catch (error) {
    res.status(500).send('Error fetching movies'); // Handle errors with a 500 status code
  }
});

// API route to fetch a single movie by ID
app.get('/api/movie/:id', async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id); // Find the movie by its ID
    if (!movie) {
      return res.status(404).send('Movie not found'); // Handle case where the movie does not exist
    }
    res.json(movie); // Send the movie data in JSON format
  } catch (error) {
    res.status(400).send('Invalid ID format'); // Handle invalid ID formats
  }
});

// API route to add a new movie
app.post('/api/movies', async (req, res) => {
  try {
    const { title, year, poster } = req.body; // Destructure data from the request body
    const newMovie = new movieModel({ title, year, poster }); // Create a new movie document
    await newMovie.save(); // Save the movie to the database
    res.status(201).json({ message: 'Movie Added!', movie: newMovie }); // Send success response
  } catch (error) {
    res.status(500).send('Error adding movie'); // Handle errors with a 500 status code
  }
});

// API route to update a movie by ID
app.put('/api/movie/:id', async (req, res) => {
  try {
    console.log('PUT /api/movie/:id called with id:', req.params.id); // Log the ID for debugging
    const updatedMovie = await movieModel.findByIdAndUpdate(
      req.params.id, // ID of the movie to update
      req.body, // New data to update
      { new: true } // Return the updated document
    );
    if (!updatedMovie) {
      return res.status(404).send('Movie not found'); // Handle case where the movie does not exist
    }
    res.json(updatedMovie); // Send the updated movie in JSON format
  } catch (error) {
    console.log('Error in PUT /api/movie/:id:', error.message); // Log the error message
    res.status(400).send('Invalid ID format or request body'); // Handle errors with a 400 status code
  }
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log the server start message
});
