const BadRequestError = require("../errors/BadRequestError");
const FrobiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const Movies = require("../models/movie");

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
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid input during creation of movie"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movies.findById(movieId)
    .orFail(() => {
      throw new NotFoundError("No item with that _id");
    })
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        Movies.findByIdAndRemove(movieId)
          .then((movie) => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw FrobiddenError("No permission to delete this item");
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};
