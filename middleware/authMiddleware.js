const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid", error });
  }
};
