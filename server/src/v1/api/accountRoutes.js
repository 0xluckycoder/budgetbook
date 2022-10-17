const { Router } = require('express');
const accountController = require('../../controllers/accountController');

const router = Router();

// router.get('/:id')

router.post('/', accountController.createAccount);

router.get('/:id', accountController.getAccountById);

router.get('/user/:id', accountController.getAccountsByUserId);

router.put('/:id', accountController.updateAccount);

router.delete('/:id', accountController.deleteAccount);

module.exports = router;

// http://localhost:5500/api/v1/account/user/:id