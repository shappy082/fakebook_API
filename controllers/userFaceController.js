const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/index')
const User = require("../models/userFaceModel")

exports.signin = async (req, res, next) => {
    try {
        const { password, user_id } = req.body;
        console.log(`user_id: ${user_id} \npassword: ${password}`)
        const user = await User.find()

        console.log("found:", user)
        // if (!user) {
        //     const error = new Error('Authentication Failed, User not found');
        //     error.statusCode = 404;
        //     throw error;
        // }
        // console.log("password" + password)
        // console.log("user.password" + user)

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        next(error);
    }
}

