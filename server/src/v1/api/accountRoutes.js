const { Router } = require('express');
const accountController = require('../../controllers/accountController');

const {
    authorizeRequest
} = require('./../../utils/authorizeRequest');

const router = Router();

// router.get('/:id')

router.post('/',authorizeRequest, accountController.createAccount);

router.get('/', authorizeRequest, accountController.getAccountsByCurrentAuthUser);

router.get('/:id', authorizeRequest, accountController.getSingleAccountByCurrentAuthUser);

// router.get('/user/:id', authorizeRequest, accountController.getAccountsByUserId);

router.put('/:id', authorizeRequest, accountController.updateAccount);

router.delete('/:id', accountController.deleteAccount);

module.exports = router;

// http://localhost:5500/api/v1/account/user/:id