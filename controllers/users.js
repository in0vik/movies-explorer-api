const { validateMovieId } = require("../middlewares/validators");
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/config");
const ms = require("ms");
const jwt = require("jsonwebtoken");

module.exports.getCurrentUser = (req, res, next) => {
  Users.findById(req.user._id).then((user) => {
    res.send(user);
  }).catch((err) => console.log(err));
};

module.exports.updateCurrentUser = (req, res, next) => {
  const { email, name } = req.body;
  Users.findByIdAndUpdate(req.user._id, { email, name }, { new: true })
  .then(
    (user) => {
      res.send(user);
    }
  ).catch((err) => console.log(err));
};

module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      Users.create({ email, password: hash })
    .then((user) => res.status(201).send({
      email: user.email
    }))
    .catch((err) => console.log(err));
  })

}

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  Users.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      console.log('не правильный логин/пароль');
      return;
    }
    return bcrypt.compare(password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          console.log('не правильный логин/пароль');
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.cookie('jwt', token, {
          maxAge: ms('7d'),
          httpOnly: true,
        })
        res.send({ token })
      });

  })
}

module.exports.signOut = (req, res, next) => {
  res.clearCookie('jwt').send({message: 'Выход'})
  .catch((err) => console.log(err));
}
