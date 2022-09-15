const { Router } = require('express');
const expenseController = require('../../controllers/expenseController');

const router = Router();

router.post('/', expenseController.createExpense);

router.get('/:id', expenseController.getExpenseById);

// router.put('/:id', expenseController.updateExpense);

// router.delete('/:id', expenseController.deleteExpense);

module.exports = router;