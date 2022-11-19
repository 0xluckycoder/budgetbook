const yup = require('yup');
const expenseService = require('../services/expenseService');
const customError = require('../utils/customError');
const uploader = require('../utils/uploader');

/**
 * @desc create expense record
 * @path POST /api/v1/expenses
 * @authorization Private
 * */
const createExpense = async (req, res, next) => {
    try {

        const { accountId } = req.params;
        const { _id: userId } = req.user;

        // validate user input
        const expenseSchema = yup.object().shape({
            title: yup.string('title must be a string')
                        .required('title is required')
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
            photos: yup.array().of(yup.string().max(200)).max(3),
            comment: yup.string('comment must be a string')
                        .max(200, 'comment is too long')
        });

        const validated = await expenseSchema.validate(req.body);
        validated.userId = userId;
        validated.accountId = accountId;
        const response = await expenseService.createExpense(validated);

        res.status(200).json({
            success: true,
            data: response
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
 * @path GET /api/v1/expenses/?date=7days
 * @authorization Private
 * */
const getExpensesByAccountId = async (req, res, next) => {
    try {
        const sortType = req.query.date;
        const { _id: userId } = req.user;
        const { accountId } = req.params;

        const response = await expenseService.getExpensesByAccountId(userId, accountId, sortType);

        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc get single expense record by id
 * @path GET /api/v1/expenses/:id
 * @authorization Private
 * */
const getExpenseById = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        const { _id: userId } = req.user;
        const getExpenseResponse = await expenseService.getExpenseById(userId, expenseId);

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
        const { expenseId } = req.params;
        const { _id: userId } = req.user;
        
        console.log(req.body);

        const expenseSchema = yup.object().shape({
            accountId: yup.string('title must be a string')
                        .max(127, 'title is too long'),
            title: yup.string('title must be a string')
                        .max(127, 'title is too long'),
            amount: yup.string('amount must be a string')
                        .max(127, 'amount is too long'),
            category: yup.string('category must be a string')
                        .max(127, 'category is too long'),
            transactionDate: yup.string('transactionDate must be a string')
                        .max(127, 'transactionDate is too long'),
            photos: yup.array().of(yup.string().max(200)).max(3),
            comment: yup.string('comment must be a string')
                        .max(200, 'comment is too long')
        });

        const validated = await expenseSchema.validate(req.body);
        validated.userId = userId;
        const updatedExpenseResponse = await expenseService.updateExpense(userId, expenseId, validated);

        res.status(200).json({
            success: true,
            data: updatedExpenseResponse
        });

    } catch(error) {
        console.log('❌❌', error)
        next(error);
    }
}

/**
 * @desc delete single expense record
 * @path DELETE /api/v1/expenses/:id
 * @authorization Private
 * */
const deleteExpense = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        const { _id: userId } = req.user;

        const deleteExpenseResponse = await expenseService.deleteExpense(userId, expenseId);
        
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
    getExpensesByAccountId,
    getExpenseById,
    updateExpense,
    deleteExpense
}