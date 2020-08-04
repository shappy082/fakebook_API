const mongoose = require("mongoose");
//const Post = require('../models/postModel');
const FriendRequest = require("../models/friendRequestModel");
const User = require("../models/userFaceModel");

module.exports.listFriendReq = async function (req, res, next) {
  try {
    const friend_req = await FriendRequest.find();
    res.status(200).json({
      success: true,
      data: friend_req,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.createFriendReq = async (req, res) => {
  const { user_id, user_id_req } = req.body;
  const checkExist = await FriendRequest.findOne({
    user_id: user_id,
    user_id_req: user_id_req,
  });
  // console.log("checkExist", checkExist);
  if (checkExist !== null) {
    res.status(409).json({ errors: "Request is already exist!" });
  } else {
    let request = new FriendRequest({
      user_id: user_id,
      user_id_req: user_id_req,
    });
    try {
      await request.save();
      res.status(201).json({ success: true });
    } catch (err) {
      res.status(500).json({
        errors: { err },
      });
    }
  }
};

module.exports.acceptFriendReq = async (req, res) => {
  try {
    const { user_id, user_id_req } = req.body;
    console.log(req.body);
    const post = await FriendRequest.updateOne(
      {
        user_id: user_id,
        user_id_req: user_id_req,
      },
      {
        flag_submit: 1,
      }
    );
    if (post.nModified === 0) {
      throw new Error("Cannot update");
    } else {
      await User.findOneAndUpdate(
        { user_id: user_id },
        {
          $push: {
            friends: user_id_req,
          },
        }
      );
      await User.findOneAndUpdate(
        { user_id: user_id_req },
        {
          $push: {
            friends: user_id,
          },
        }
      );
      res.status(201).json({
        success: true
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
