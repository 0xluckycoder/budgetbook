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

router.put('/:id', authorizeRequest, accountController.updateAccount);

router.delete('/:id', authorizeRequest, accountController.deleteAccount);

module.exports = router;