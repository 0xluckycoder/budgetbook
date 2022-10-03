const { Router } = require('express');
const expenseController = require('../../controllers/expenseController');
const multer = require('multer');

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
    storage: storage,
    limits: 1000000
});

router.post('/', expenseController.createExpense);

router.post('/image', upload.array('expense-images'), expenseController.uploadImage);

router.get('/', expenseController.getExpenses);

router.get('/:id', expenseController.getExpenseById);

router.put('/:id', expenseController.updateExpense);

router.delete('/:id', expenseController.deleteExpense);

module.exports = router;