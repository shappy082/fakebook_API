const Comment = require("../models/commentModel");

module.exports.insertComment = async (req, res) => {
  console.log(req.body);
  const { user_id, img, comment } = req.body;
  let post = new Comment({
    user_id: user_id,
    img: img,
    comment: comment,
  });

  try {
    await post.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({
      errors: { err },
    });
  }
};

module.exports.deleteComment = async (req, res) => {
  const { _id } = req.body;
  console.log(`comment _id : ${_id}`);
  try {
    await Comment.findOneAndDelete({ _id: _id });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      errors: { err },
    });
  }
};

module.exports.findUserComment = async (req, res) => {
  const { user_id } = req.params;
  console.log(`find Id : ${user_id}`);
  const comment = await Comment.find({ user_id: user_id });
  res.status(200).json({
    success: true,
    found: comment.length,
    data: comment,
  });
};

module.exports.replyComment = async (req, res) => {
  const { _id, reply } = req.body;
  //   console.log(_id, reply);
  const comment = await Comment.findOneAndUpdate(
    { _id: _id },
    {
      $push: {
        reply: reply,
      },
    },
    {
      returnOriginal: false,
    }
  );
  res.status(200).json({
    success: true,
    data: comment,
  });
};

module.exports.likeComment = async (req, res) => {
  const { _id } = req.body;
  //   console.log(_id, reply);
  const comment = await Comment.findOneAndUpdate(
    { _id: _id },
    {
      $inc: { count_like: 1 },
    },
    {
      returnOriginal: false,
    }
  );
  res.status(200).json({
    success: true,
    data: comment,
  });
};
