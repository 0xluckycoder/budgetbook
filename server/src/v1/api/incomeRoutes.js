const { Router } = require('express');
const incomeController = require('../../controllers/incomeController');

const router = Router();

router.post('/', incomeController.createIncome);

router.get('/', incomeController.getIncomes);

router.get('/:id', incomeController.getIncomeById);

router.put('/:id', incomeController.updateIncome);

router.delete('/:id', incomeController.deleteIncome);

module.exports = router;