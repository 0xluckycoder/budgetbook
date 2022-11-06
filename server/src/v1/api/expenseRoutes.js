const { Router } = require('express');
const expenseController = require('../../controllers/expenseController');
const multer = require('multer');
const {
    authorizeRequest
} = require('./../../utils/authorizeRequest');

const router = Router();

// multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ 
    storage,
    limits: 1000000
});

router.post('/:accountId', authorizeRequest, expenseController.createExpense);

router.post('/image', upload.array('expense-images'), expenseController.uploadImage);

router.get('/accounts/:accountId', authorizeRequest, expenseController.getExpensesByAccountId);

router.get('/:expenseId', authorizeRequest, expenseController.getExpenseById);

router.put('/:expenseId', authorizeRequest, expenseController.updateExpense);

router.delete('/:expenseId', authorizeRequest, expenseController.deleteExpense);

module.exports = router;