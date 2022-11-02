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

router.post('/', incomeController.createIncome);

router.post('/image', upload.array('income-images'), incomeController.uploadImage);

router.get('/', incomeController.getIncomes);

router.get('/:id', incomeController.getIncomeById);

router.put('/:id', incomeController.updateIncome);

router.delete('/:id', incomeController.deleteIncome);

module.exports = router;