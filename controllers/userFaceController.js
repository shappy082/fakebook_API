const config = require("../config/index");
const User = require("../models/userFaceModel");

var jwt = require("jsonwebtoken");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.JWT_SECRET;

module.exports.signin = async (req, res) => {
  const { username, password } = req.body;
  // usually this would be a database call:
  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(401).json({ message: "no such user found" });
  }
  if (password === user.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = { id: user.id };
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ message: "successful", token: token });
  } else {
    res.status(401).json({ message: "invalid credentials" });
  }
};

module.exports.signup = async (req, res) => {
  const { username, password, name, dob } = req.body;
  //count all user
  await User.find().countDocuments(async function (error, count) {
    if (error) {
      res.status(500).json({
        errors: { error },
      });
    }
    let newUser = new User({
      user_id: count + 1,
      username: username,
      password: password,
      name: name,
      dob: dob,
    });
    try {
      //find exist user
      const oldUser = await User.findOne({ username: username });
      if (oldUser === null) {
        //save new user
        await newUser.save();
        res.status(201).json({
          success: true,
          message: "Created new user.",
        });
      } else {
        res.status(200).json({
          success: false,
          message: "User already exist.",
        });
      }
    } catch (err) {
      res.status(500).json({
        errors: { err },
      });
    }
  });
};

module.exports.friendList = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findOne({ user_id: user_id });
    if (user !== null) {
      //found
      res.status(200).json({
        success: true,
        found: user.friends.length,
        data: user.friends,
      });
    } else {
      //not found
      res.status(200).json({
        success: true,
        found: 0,
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: { err },
    });
  }
};