const { Router } = require('express');
const authController = require('../../controllers/authController');
const {
    authorizeRequest
} = require('./../../utils/authorizeRequest');

const router = Router();

router.post('/signup', authController.signUp);

router.post('/signin', authController.signIn);

// router.post('/confirmEmail/:token',);

router.get('/verifyAuth', authController.verifyAuth);

router.get('/users', authorizeRequest, authController.getUserAttributesBySubId);

router.put('/users', authorizeRequest, authController.updateUserAttributes);

router.get('/logout', authorizeRequest, authController.logout);

module.exports = router;