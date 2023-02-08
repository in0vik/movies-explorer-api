const { celebrate, Joi } = require("celebrate");
const { regex } = require("./config/constants");

module.exports.validateUserData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  })
})

module.exports.validateMovieData = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().is.required().regex(regex.link),
    trailer: Joi.string().required().regex(regex.link),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(regex.link),
    movieId: Joi.string().required(),
  })
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  })
});