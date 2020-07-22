const Comment = require('../models/commentModel');

module.exports.insertComment = async (req, res) => {
    console.log(req.body);
    const { user_id, img, comment } = req.body;
    // console.log(`Title : ${title}`);
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
            errors: { err }
        });
    }
}

module.exports.findUserComment = async (req, res) => {
    const { user_id } = req.params;
    console.log(`find Id : ${user_id}`);
    const comment = await Comment.find({ user_id: user_id });
    res.status(200).json({ comment });
}