const path = require('path');
const { Router } = require('express');
const incomeController = require('../../controllers/incomeController');
const multer = require('multer');
const {
    authorizeRequest
} = require('./../../utils/authorizeRequest');

const router = Router();

// multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../../src/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ 
    storage: storage,
    limits: 1000000
});

router.post('/:accountId', authorizeRequest, incomeController.createIncome);

router.post('/uploads/image', authorizeRequest, upload.array('income-images'), incomeController.uploadImage);

router.get('/accounts/:accountId', authorizeRequest, incomeController.getIncomesByAccountId);

router.get('/:incomeId', authorizeRequest, incomeController.getIncomeById);

router.put('/:incomeId', authorizeRequest, incomeController.updateIncome);

router.delete('/:incomeId', authorizeRequest, incomeController.deleteIncome);

module.exports = router;