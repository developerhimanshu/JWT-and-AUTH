const jwt = require("jsonwebtoken");
const { badRequest } = require("../errors/index");
require("dotenv").config();
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new badRequest("Please provie email and password");
  }

  //A demo Id, basically it will be provided by the database
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Welcome ${req.user.username}`,
    secret: `Your Authenticated Secret is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
