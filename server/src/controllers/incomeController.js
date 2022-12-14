const yup = require('yup');
const incomeService = require('../services/incomeService');

/**
 * @desc create new income record
 * @path POST /api/v1/incomes
 * @authorization Private
 * */
const createIncome = async (req, res, next) => {
    try {

        console.log(req.body);

        const { accountId } = req.params;
        const { _id: userId } = req.user;

        // validate user input
        const incomeSchema = yup.object().shape({
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
            photos: yup.array().of(yup.string().max(127)).max(3),
            comment: yup.string('comment must be a string')
                        .max(127, 'comment is too long')
        });

        const validated = await incomeSchema.validate(req.body);
        validated.userId = userId;
        validated.accountId = accountId;
        const createIncomeResponse = await incomeService.createIncome(validated);

        res.status(200).json({
            success: true,
            data: createIncomeResponse
        });
    } catch(error) {
        console.log(error);
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
 * @desc get income records by date period
 * @path GET /api/v1/incomes/?date=7days
 * @authorization Private
 * */
const getIncomesByAccountId = async (req, res, next) => {
    try {
        const sortType = req.query.date;
        const { _id: userId } = req.user;
        const { accountId } = req.params;

        const getIncomesResponse = await incomeService.getIncomesByAccountId(userId, accountId, sortType);

        res.status(200).json({
            success: true,
            data: getIncomesResponse
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
}

/**
 * @desc get income record by id
 * @path GET /api/v1/incomes/:id
 * @authorization Private
 * */
const getIncomeById = async (req, res, next) => {
    try {
        const { incomeId } = req.params;
        const { _id: userId } = req.user;
        const getIncomeResponse = await incomeService.getIncomeById(userId, incomeId);

        res.status(200).json({
            success: true,
            data: getIncomeResponse
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
}

/**
 * @desc update single income record
 * @path PUT /api/v1/income/:id
 * @authorization Private
 * */
const updateIncome = async (req, res, next) => {
    try {
        const { incomeId } = req.params;
        const { _id: userId } = req.user;

        const incomeSchema = yup.object().shape({
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

        const validated = await incomeSchema.validate(req.body);
        validated.userId = userId;
        const updatedIncomeResponse = await incomeService.updateIncome(userId, incomeId, validated);

        res.status(200).json({
            success: true,
            data: updatedIncomeResponse
        });

    } catch(error) {
        console.log(error);
        next(error);
    }
}

/**
 * @desc delete single income record
 * @path DELETE /api/v1/incomes/:id
 * @authorization Private
 * */
const deleteIncome = async (req, res, next) => {
    try {
        const { incomeId } = req.params;
        const { _id: userId } = req.user;

        console.log('came here');

        const deleteIncomeResponse = await incomeService.deleteIncome(userId, incomeId);
        
        res.status(200).json({
            success: true,
            data: deleteIncomeResponse
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
}


module.exports = {
    createIncome,
    getIncomesByAccountId,
    getIncomeById,
    updateIncome,
    deleteIncome,
    uploadImage
}