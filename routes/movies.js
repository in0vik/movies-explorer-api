const moviessRoutes = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require("../controllers/movies");
const { validateMovieId, validateMovieData } = require("../middlewares/validators");

moviessRoutes.get('/', getAllMovies);
moviessRoutes.post('/', validateMovieData,  createMovie);
moviessRoutes.delete('/:id', validateMovieId,  deleteMovie);