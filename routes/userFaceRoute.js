const express = require('express')
const { body } = require('express-validator');
const userFaceController = require('../controllers/userFaceController')
const authentication = require('../middleware/authenticationHandler');
const authorization = require('../middleware/authorizationHandler');

const router = express.Router()
router.post('/', [
    body('password').not().isEmpty().withMessage('Field password is required')
  ], userFaceController.signin);
/* router.post('/signin',
    body('email').not().isEmpty().withMessage('Field email is required').isEmail().withMessage('Wrong email format'),
    body('password').not().isEmpty().withMessage('Field password is required')
    , userController.signin);
router.get('/me', authentication.isLoggedIn, userController.getProfile); */

// router.get('/', userFaceController.index);
// router.get('/:id', authentication.isLoggedIn, userController.getUserById);
// router.put('/:id', authentication.isLoggedIn, userController.updateUser);
// router.delete('/:id', [authentication.isLoggedIn, authorization.isAdmin], userController.deleteUser);
module.exports = router

