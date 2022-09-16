const yup = require('yup');
const incomeService = require('../services/incomeService');

const createIncome = async (req, res, next) => {
    try {
        // validate user input
        const incomeSchema = yup.object().shape({
            title: yup.string('title must be a string')
                        .max(127, 'firstname is too long'),
            amount: yup.string('amount must be a string')
                        .required('amount is required')
                        .max(127, 'amount is too long'),
            category: yup.string('category must be a string')
                        .required('category is required')
                        .max(127, 'category is too long'),
            transactionDate: yup.string('transactionDate must be a string')
                        .required('transactionDate is required')
                        .max(127, 'transactionDate is too long'),
            photos: yup.array().of(yup.string().max(127)).max(3),
            comment: yup.string('comment must be a string')
                        .max(127, 'comment is too long'),
            account: yup.string('account must be a string')
                        .required('account is required')
                        .max(127, 'account is too long'),
        });

        const validated = await incomeSchema.validate(req.body);
        const createIncomeResponse = await incomeService.createIncome(validated);

        res.status(200).json({
            success: true,
            data: createIncomeResponse
        });
    } catch(error) {
        next(error);
    }
}

const getIncomeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const getIncomeResponse = await incomeService.getIncomeById(id);

        res.status(200).json({
            success: true,
            data: getIncomeResponse
        });
    } catch(error) {
        next(error);
    }
}

const updateIncome = async (req, res, next) => {
    try {
        const { id } = req.params;

        const incomeSchema = yup.object().shape({
            title: yup.string('title must be a string')
                        .max(127, 'firstname is too long'),
            amount: yup.string('amount must be a string')
                        .max(127, 'amount is too long'),
            category: yup.string('category must be a string')
                        .max(127, 'category is too long'),
            transactionDate: yup.string('transactionDate must be a string')
                        .max(127, 'transactionDate is too long'),
            photos: yup.array().of(yup.string().max(127)).max(3),
            comment: yup.string('comment must be a string')
                        .max(127, 'comment is too long'),
            account: yup.string('account must be a string')
                        .max(127, 'account is too long'),
        });

        const validated = await incomeSchema.validate(req.body);
        const updatedIncomeResponse = await incomeService.updateIncome(validated, id);

        res.status(200).json({
            success: true,
            data: updatedIncomeResponse
        })

    } catch(error) {
        next(error);
    }
}

const deleteIncome = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteIncomeResponse = await incomeService.deleteIncome(id);
        res.status(200).json({
            success: true,
            data: deleteIncomeResponse
        });
    } catch(error) {
        next(error);
    }
}


module.exports = {
    createIncome,
    getIncomeById,
    updateIncome,
    deleteIncome
}