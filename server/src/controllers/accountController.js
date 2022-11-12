const yup = require('yup');
const accountService = require('../services/accountService');

/**
 * @desc create new financial account record
 * @path POST /api/v1/account
 * @authorization Private
 * */
const createAccount = async (req, res, next) => {
    try {
        const { _id } = req.user;
        
        // validate user input
        const accountSchema = yup.object().shape({
            name: yup.string('name must be a string')
                        .required('name is required')
                        .max(127, 'name is too long'),
            value: yup.string('value must be a string')
                        .required('value is required')
                        .max(127, 'value is too long'),
            currencyType: yup.string('currency type must be a string')
                        .required('name is required')
                        .max(127, 'currency type is too long'),
            description: yup.string('description must be a string')
                        .max(127, 'description is too long'),
        });

        const validated = await accountSchema.validate(req.body);
        validated.userId = _id;
        
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


/**
 * @desc gets all financial accounts by current authenticated user
 * @path GET /api/v1/accounts
 * @authorization Private
 * */
const getAccountsByCurrentAuthUser = async (req, res, next) => {
    try {
        const { _id } = req.user;
        
        const response = await accountService.getAccountsByCurrentAuthUser(_id);
        
        res.status(200).json({
            status: true,
            data: response
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

/**
 * @desc gets single financial account by current authenticated user
 * @path GET /api/v1/accounts/:id
 * @authorization Private
 * */
const getSingleAccountByCurrentAuthUser = async (req, res, next) => {
    try {
        const { id: accountId } = req.params;
        const { _id: userId } = req.user;
        const response = await accountService.getSingleAccountByCurrentAuthUser(userId, accountId);
        
        res.status(200).json({
            status: true,
            data: response
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

/**
 * @desc update single account record
 * @path PUT /api/v1/account/:id
 * @authorization Private
 * */
const updateAccount = async (req, res, next) => {
    try {
        const { id: accountId } = req.params;
        const { _id: userId } = req.user;

        // console.log('t',req.user);

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

        const updatedAccountResponse = await accountService.updateAccount(userId, accountId, validated);
        
        res.status(200).json({
            success: true,
            data: updatedAccountResponse
        });

    } catch(error) {
        console.log(error);
        next(error);
    }
}

/**
 * @desc deletes single account record
 * @path DELETE /api/v1/accounts/:id
 * @authorization Private
 * */
const deleteAccount = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
        const { id: accountId } = req.params;
        
        const response = await accountService.deleteAccount(userId, accountId);
        
        res.status(200).json({
            success: true,
            data: response
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createAccount,
    getAccountsByCurrentAuthUser,
    getSingleAccountByCurrentAuthUser,
    updateAccount,
    deleteAccount
}