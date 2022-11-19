const expense = require('../database/expense');
const user = require('../database/user');
const account = require('../database/account');
const moment = require('moment');
const customError = require('../utils/customError');
const deleteObjects = require('../utils/deleteObjects');

const createExpense = async (expenseData) => {
    try {
        // fetch related account
        const relatedAccount = await account.getAccountById(expenseData.accountId);

        // calculate account total
        const currentAccountValue = parseInt(relatedAccount.value);
        const expenseValue = parseInt(expenseData.amount);
        const newAccountValue = currentAccountValue - expenseValue;
        relatedAccount.value = newAccountValue.toString();

        // update account total
        const updatedAccount = await account.updateAccount({
            value: relatedAccount.value
        }, expenseData.accountId);

        // create expense
        const createExpense = await expense.createExpense(expenseData);
        return createExpense;
    } catch(error) {
        throw error;
    }
}

const getExpensesByAccountId = async (userId, accountId, sortType) => {
    try {
        // throw error if requested expense account not belong to the user
        const requestedAccount = await account.getAccountsByCurrentAuthUser(accountId);
        if (requestedAccount.userId === userId) throw customError('Unauthorized request', 'Unauthorized');
        
        const expensesByAccountId = await expense.getExpensesByAccountId(accountId, sortType);
        return expensesByAccountId;
    } catch(error) {
        throw error;
    }
}

const getExpenseById = async (userId, expenseId) => {
    try {
        // throw error if expense record does not belong to the current user
        const requestedExpense = await expense.getExpenseById(expenseId);
        if (requestedExpense.userId !== userId) throw customError('Unauthorized request', 'Unauthorized');
        
        return requestedExpense;
    } catch (error) {
        throw error;
    }
}

const updateExpense = async (userId, expenseId, expenseData) => {
    try {
        // throw error if expense record not belong to the user
        const requestedExpense = await expense.getExpenseById(expenseId);
        if (requestedExpense.userId !== userId) throw customError('Unauthorized request', 'Unauthorized');

        // fetch related account
        const relatedAccount = await account.getAccountById(expenseData.accountId);

        // calculate new total account value
        const currentAccountValue = parseInt(relatedAccount.value);
        const currentExpenseValue = parseInt(requestedExpense.amount);
        const newExpenseValue = parseInt(expenseData.amount);
        const differenceValue = currentExpenseValue - newExpenseValue;
        const newAccountValue = currentAccountValue + differenceValue;

        // update new account value
        const updatedAccount = await account.updateAccount({
            value: newAccountValue.toString()
        }, expenseData.accountId);

        const updatedExpense = await expense.updateExpense(expenseData, expenseId);
        return updatedExpense;
    } catch(error) {
        throw error;
    }
}

const deleteExpense = async (userId, expenseId) => {
    try {
        // throw error if expense record not belong to the user
        const requestedExpense = await expense.getExpenseById(expenseId);
        if (requestedExpense.userId !== userId) throw customError('Unauthorized request', 'Unauthorized');

        // delete objects from s3
        if (requestedExpense.photos.length > 0) {
            const deletedResponse = await deleteObjects(requestedExpense.photos);
            console.log(deletedResponse);
        }

        // fetch related account
        const relatedAccount = await account.getAccountById(requestedExpense.accountId);

        // calculate new total account value
        const currentAccountValue = parseInt(relatedAccount.value);
        const expenseValue = parseInt(requestedExpense.amount);
        const newAccountValue = currentAccountValue + expenseValue;

        // update new account value
        const updatedAccount = account.updateAccount({
            value: newAccountValue.toString()
        }, requestedExpense.accountId);

        const deleteExpense = expense.deleteExpense(expenseId);
        return deleteExpense;
    } catch(error) {
        throw error;
    }
}


module.exports = {
    createExpense,
    getExpensesByAccountId,
    getExpenseById,
    updateExpense,
    deleteExpense,
}