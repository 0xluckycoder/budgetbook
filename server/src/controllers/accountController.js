const yup = require('yup');
const accountService = require('../services/accountService');

const createAccount = async (req, res, next) => {
    try {
        // validate user input
        const accountSchema = yup.object().shape({
            name: yup.string('name must be a string')
                        .required('name is required')
                        .max(127, 'name is too long'),
            value: yup.string('value must be a string')
                        .required('value is required')
                        .max(127, 'value is too long'),
            currencyType: yup.string('currency type must be a string')
                        .max(127, 'currency type is too long'),
            description: yup.string('description must be a string')
                        .max(127, 'description is too long'),
        });

        const validated = await accountSchema.validate(req.body);
        const createdAccountResponse = await accountService.createAccount(validated);

        res.status(200).json({
            success: true,
            data: createdAccountResponse
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
}

const getAccountsByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const getAccountByUserIdResponse = await accountService.getAccountsByUserId(id);

        res.status(200).json({
            success: true,
            data: getAccountByUserIdResponse
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
}

const getAccountById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const getAccountResponse = await accountService.getAccountById(id);

        res.status(200).json({
            success: true,
            data: getAccountResponse
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
}

const updateAccount = async (req, res, next) => {
    try {
        const { id } = req.params;

        const accountSchema = yup.object().shape({
            name: yup.string('name must be a string')
                        .max(127, 'name is too long'),
            value: yup.string('value must be a string')
                        .max(127, 'value is too long'),
            currencyType: yup.string('currency type must be a string')
                        .max(127, 'currency type is too long'),
            description: yup.string('description must be a string')
                        .max(127, 'description is too long'),
        });

        const validated = await accountSchema.validate(req.body);
        const updatedAccountResponse = await accountService.updateAccount(validated, id);

        res.status(200).json({
            success: true,
            data: updatedAccountResponse
        });

    } catch(error) {
        console.log(error);
        next(error);
    }
}

const deleteAccount = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteAccountResponse = await accountService.deleteAccount(id);
        res.status(200).json({
            success: true,
            data: deleteAccountResponse
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createAccount,
    getAccountById,
    getAccountsByUserId,
    updateAccount,
    deleteAccount
}