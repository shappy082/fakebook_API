const mongoose = require("mongoose");
//const Post = require('../models/postModel');
const FriendRequest = require("../models/friendRequestModel");

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
  console.log(req.body);
  const { user_id, user_id_req, flag_submit } = req.body;
  // console.log(`user_id : ${user_id}`);
  let post = new FriendRequest({
    user_id: user_id,
    user_id_req: user_id_req,
    flag_submit: flag_submit,
  });

  try {
    await post.save();
    res.status(201).json({ data: post, success: true });
  } catch (err) {
    res.status(500).json({
      errors: { err },
    });
  }
};

module.exports.acceptFriendReq = async (req, res) => {
  try {
    //const { id } = req.params;
    const { user_id, user_id_req, flag_submit } = req.body;
    console.log(req.body);
    // console.log(`user_id : ${user_id}`);
    // console.log(`user_id_req : ${user_id_req}`);
    // console.log(`flag_submit : ${flag_submit}`);
    const post = await FriendRequest.updateOne(
      {
        user_id: user_id,
        user_id_req: user_id_req,
      },
      {
        flag_submit: flag_submit,
      }
    );
    console.log(post)
    if (post.nModified === 0) {
      throw new Error("Cannot update");
    } else {
      res.status(201).json({
        message: "Update completed",
        success: true,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: [
        {
          code: 500,
          message: err.message,
        },
      ],
    });
  }
};
