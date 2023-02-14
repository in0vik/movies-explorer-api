const ms = require('ms');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/user');
const { JWT_SECRET } = require('../config/config');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { statusCodes } = require('../config/constants');

module.exports.getCurrentUser = (req, res, next) => {
  Users.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(statusCodes.notFound.message.user);
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === statusCodes.badRequest.name.user) {
        next(new BadRequestError(statusCodes.badRequest.message.user));
      } else {
        next(err);
      }
    });
};

module.exports.updateCurrentUser = (req, res, next) => {
  const { email, name } = req.body;
  Users.findByIdAndUpdate(req.user._id, { email, name }, { new: true })
    .orFail(() => {
      throw new NotFoundError(statusCodes.notFound.message.user);
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(statusCodes.conflict.message.user));
      } else if (err.name === statusCodes.conflict.name) {
        next(new BadRequestError(statusCodes.badRequest.message.user));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => Users.create({ email, password: hash, name }))
    .then((user) => res.status(statusCodes.created.statusCode).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(statusCodes.userExists.message.default));
      } else if (err.name === statusCodes.conflict.name) {
        next(new BadRequestError(statusCodes.badRequest.message.user));
      } else {
        next(err);
      }
    });
};

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  Users.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError(statusCodes.unauthorized.message.user));
      }
      return bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return next(new UnauthorizedError(statusCodes.unauthorized.message.user));
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: '7d',
          });
          res.cookie('jwt', token, {
            maxAge: ms('7d'),
            httpOnly: true,
          });
          return res.send({ name: user.name, email: user.email });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: statusCodes.OK.message.signOut });
};
