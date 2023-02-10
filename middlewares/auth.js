const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Login required" });
  }
  const token = authorization.split(" ")[1];
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log(err);
  }
  req.user = payload;
  next();
};

module.exports = auth;
