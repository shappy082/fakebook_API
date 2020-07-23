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
    const { user_id, user_id_req,flag_submit } = req.body;
    console.log(`user_id : ${user_id}`);
    let post = new Post({
        user_id: user_id,
        user_id_req: user_id_req,
        flag_submit: flag_submit
    });

    try {
        await post.save();
        res.status(201).json({ data: post, success: true });
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}
