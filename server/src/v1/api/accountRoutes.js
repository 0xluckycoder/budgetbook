const { Router } = require('express');
const accountController = require('../../controllers/accountController');

const router = Router();

router.post('/', accountController.createAccount);

router.get('/:id', accountController.getAccountById);

router.put('/:id', accountController.updateAccount);

router.delete('/:id', accountController.deleteAccount);

module.exports = router;