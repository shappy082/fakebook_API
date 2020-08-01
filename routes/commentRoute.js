const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authentication = require("../middleware/authenticationHandler");

router.get("/find/:user_id", commentController.findUserComment);
// router.get('/find/:user_id', authentication.isLoggedIn, commentController.findUserComment)

router.post("/insert", commentController.insertComment);
router.post("/delete", commentController.deleteComment);
router.post("/reply", commentController.replyComment);
router.post("/like", commentController.likeComment);

module.exports = router;
