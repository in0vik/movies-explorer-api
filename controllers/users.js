const { validateMovieId } = require("../middlewares/validators");
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/config");
const ms = require("ms");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports.getCurrentUser = (req, res, next) => {
  Users.findById(req.user._id)
  .orFail(() => {
    throw new NotFoundError('Not found user');
  })
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    if (err.name === "CastError") {
      next(new BadRequestError("Invalid input during creation of user"));
    } else {
      next(err);
    }
  })
};

module.exports.updateCurrentUser = (req, res, next) => {
  const { email, name } = req.body;
  Users.findByIdAndUpdate(req.user._id, { email, name }, { new: true })
  .orFail(() => {
    throw new NotFoundError('Not found user');
  })
  .then(
    (user) => {
      res.send(user);
    }
  )
  .catch((err) => {
    if (err.code === 11000) {
      next(new ConflictError("User already exists"));
    } else if (err.name === "ValidationError") {
      next(new BadRequestError("Invalid input during updating of user"));
    } else {
      next(err);
    }
  });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      Users.create({ email, password: hash, name })
    .then((user) => res.status(201).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("User already exists"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid input during updating of user"));
      } else {
        next(err);
      }
    });
  })

}

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  Users.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      return next(new UnauthorizedError('Непрвильная почта или пароль'));
    }
    return bcrypt.compare(password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          return next(new UnauthorizedError('Непрвильная почта или пароль'));
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.cookie('jwt', token, {
          maxAge: ms('7d'),
          httpOnly: true,
        })
        res.send({ token })
      });

  })
  .catch((err) => {
    next(new UnauthorizedError(err.message));
  });
}

module.exports.signOut = (req, res, next) => {
  res.clearCookie('jwt').send({message: 'Выход'})
  .catch(next);
}
