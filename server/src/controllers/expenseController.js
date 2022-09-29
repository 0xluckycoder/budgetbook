const yup = require('yup');
const expenseService = require('../services/expenseService');

const createExpense = async (req, res, next) => {
    try {
        // validate user input
        const expenseSchema = yup.object().shape({
            title: yup.string('title must be a string')
                        .max(127, 'title is too long'),
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

        const validated = await expenseSchema.validate(req.body);
        const createExpenseResponse = await expenseService.createExpense(validated);

        res.status(200).json({
            success: true,
            data: createExpenseResponse
        });
    } catch(error) {
        next(error);
    }
}

const getExpenses = async (req, res, next) => {
    try {
        const sortType = req.query.date;
        const getExpenseResponse = await expenseService.getExpenses(sortType);

        res.status(200).json({
            success: true,
            data: getExpenseResponse
        });
    } catch (error) {
        next(error);
    }
}

const getExpenseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const getExpenseResponse = await expenseService.getExpenseById(id);

        res.status(200).json({
            success: true,
            data: getExpenseResponse
        });
    } catch(error) {
        next(error);
    }
}

const updateExpense = async (req, res, next) => {
    try {
        const { id } = req.params;

        const expenseSchema = yup.object().shape({
            title: yup.string('title must be a string')
                        .max(127, 'title is too long'),
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

        const validated = await expenseSchema.validate(req.body);
        const updatedExpenseResponse = await expenseService.updateExpense(validated, id);

        res.status(200).json({
            success: true,
            data: updatedExpenseResponse
        })

    } catch(error) {
        next(error);
    }
}

const deleteExpense = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteExpenseResponse = await expenseService.deleteExpense(id);
        res.status(200).json({
            success: true,
            data: deleteExpenseResponse
        });
    } catch(error) {
        next(error);
    }
}

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}