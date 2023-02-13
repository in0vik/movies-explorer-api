const moviesRoutes = require('express').Router();
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateMovieId,
  validateMovieData,
} = require('../middlewares/validators');

moviesRoutes.get('/', getAllMovies);
moviesRoutes.post('/', validateMovieData, createMovie);
moviesRoutes.delete('/:movieId', validateMovieId, deleteMovie);

exports.moviesRoutes = moviesRoutes;
