const { statusCodes } = require('../config/constants');
const BadRequestError = require('../errors/BadRequestError');
const FrobiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Movies = require('../models/movie');

module.exports.getAllMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === statusCodes.badRequest.name.movie) {
        next(new BadRequestError(statusCodes.badRequest.message.movie));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movies.findById(movieId)
    .orFail(() => {
      throw new NotFoundError(statusCodes.notFound.message.movie);
    })
    .then((movieItem) => {
      if (req.user._id === movieItem.owner.toString()) {
        Movies.findByIdAndRemove(movieId)
          .then((movie) => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw new FrobiddenError(statusCodes.forbidden.message.movie);
      }
    })
    .catch((err) => {
      if (err.name === statusCodes.badRequest.name.movie) {
        next(new BadRequestError(statusCodes.badRequest.message.movie));
      } else {
        next(err);
      }
    });
};
