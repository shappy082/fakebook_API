const express = require('express')
const router = express.Router()
const friendReqController   = require('../controllers/friendReqController')

//GET localhost:3000/api/post
router.get('/list', friendReqController.listFriendReq)
router.post('/accept', friendReqController.createFriendReq)
//GET localhost:3000/api/post/xxxxxxxxxxx
// router.get('/:id', friendReqController.getPostById)
// //router.get('/tag/:id', postController.getTags)
// //router.get('/comment/:id', postController.getComments)
// //POST localhost:3000/api/post  {BODY}
// router.post('/', friendReqController.createPost)
// //PUT localhost:3000/api/post/xxxxxxxxxxxx {BODY}
// router.put('/:id', friendReqController.updatePost)
// //PATCH localhost:3000/api/post/xxxxxxxxxxxx {BODY}
// //router.patch('/:id', postController.updatePostSome)
// // DELETED localhost:3000/api/post/xxxxxxxxxxxx
// router.delete('/:id', friendReqController.deletePost)

module.exports = router
