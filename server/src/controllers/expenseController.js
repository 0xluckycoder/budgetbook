const yup = require('yup');
const expenseService = require('../services/expenseService');
const customError = require('../utils/customError');
const uploader = require('../utils/uploader');

/**
 * @desc create expense record
 * @path POST /api/v1/expense
 * @authorization Private
 * */
const createExpense = async (req, res, next) => {
    try {

        console.log(req.body);

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

        console.log('🔥', createExpenseResponse);

        res.status(200).json({
            success: true,
            data: createExpenseResponse
        });
    } catch(error) {
        next(error);
    }
}

const uploadImage = async (req, res, next) => {
    try {
        const { files } = req;

        console.log(files);

        if (files.length === 0) throw customError('invalid file size', 'ValidationFailed');

        // upload and get collect urls
        const imageUrls = [];

        // loop through and upload
        for (const image of files) {
            const uploadImageResponse = await uploader(image);
            imageUrls.push(uploadImageResponse);
        }
        
        res.status(200).json({
            success: true,
            data: imageUrls
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

/**
 * @desc get expense records by date period
 * @path GET /api/v1/expense?date=7days
 * @authorization Private
 * */
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

/**
 * @desc get single expense record by id
 * @path GET /api/v1/expense/:id
 * @authorization Private
 * */
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

/**
 * @desc update single expense record
 * @path PUT /api/v1/expense/:id
 * @authorization Private
 * */
const updateExpense = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        console.log(req.body);

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

/**
 * @desc delete single expense record
 * @path DELETE /api/v1/expense/:id
 * @authorization Private
 * */
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
    uploadImage,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}