const config = require('../config/index')
const User = require("../models/userFaceModel")

var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.JWT_SECRET;

exports.signin = async (req, res, next) => {
  if (req.body.username && req.body.password) {
    var name = req.body.username;
    var password = req.body.password;
  }
  // usually this would be a database call:
  // console.log("name:" + name + "password:" + password)
  const user = await User.findOne({ username: name })
  if (!user) {
    res.status(401).json({ message: "no such user found" });
  }

  if (password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = { id: user.id };
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ message: "ok", token: token });
  } else {
    res.status(401).json({ message: "invalid credentials" });
  }
}
/* exports.signin = async (req, res, next) => {
    try {
        const { password ,user_id} = req.body;
        console.log
            (`user_id: ${user_id}
             password: ${password}`)

        const user = await User.findOne({ user_id: user_id})

        console.log("found",user)
        if (!user) {
            const error = new Error('Authentication Failed, User not found');
            error.statusCode = 404;
            throw error;
        }
    console.log("password"+password)
    console.log("user.password"+user.password)

    if(user.password===password){
         return res.status(200).json({ user });
    }


    } catch (error) {

        next(error);
    }
} */

