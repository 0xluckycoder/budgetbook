const account = require('../database/account');
const expense = require('../database/expense');
const income = require('../database/income');
const user = require('../database/user');
const customError = require('../utils/customError');
const { getIncomesByAccountId } = require('./incomeService');
const deleteObjects = require('../utils/deleteObjects');

const createAccount = async (accountData) => {
    try {
        const createAccount = await account.createAccount(accountData);
        return createAccount;
    } catch(error) {
        throw error;
    }
}

const getAccountsByCurrentAuthUser = async (userId) => {
    try {
        const getAccountsByCurrentAuthUser = await account.getAccountsByCurrentAuthUser(userId);
        return getAccountsByCurrentAuthUser;
    } catch(error) {
        throw error;
    }
}

const getSingleAccountByCurrentAuthUser = async (userId, accountId) => {
    try {
        const getSingleAccountByCurrentAuthUser = await account.getSingleAccountByCurrentAuthUser(accountId);
        // throw error if requested account not belong to the user
        if (getSingleAccountByCurrentAuthUser.userId !== userId) throw customError('Unauthorized request', 'Unauthorized');
        return getSingleAccountByCurrentAuthUser;
    } catch (error) {
        throw error;
    }
}

const updateAccount = async (userId, accountId, accountData) => {
    try {
        // throw error if requested account not belong to the user
        const getSingleAccountByCurrentAuthUser = await account.getSingleAccountByCurrentAuthUser(accountId);
        if (getSingleAccountByCurrentAuthUser.userId !== userId) throw customError('Unauthorized request', 'Unauthorized');
        // update the account
        const updateAccount = account.updateAccount(accountData, accountId);
        return updateAccount;
    } catch(error) {
        throw error;
    }
}

const deleteAccount = async (userId, accountId) => {
    try {
        // throw error if requested account not belong to the user
        const getSingleAccountByCurrentAuthUser = await account.getSingleAccountByCurrentAuthUser(accountId);
        if (getSingleAccountByCurrentAuthUser.userId !== userId) throw customError('Unauthorized request', 'Unauthorized');

        // restrict user from deleting all the accounts
        const allAccounts = await account.getAccountsByCurrentAuthUser(userId);
        if (allAccounts.length === 1) {
            throw customError('cannot delete last available account', 'ValidationFailed');
            return;   
        }

        // query all related records
        const expensesByAccountId = await expense.getExpensesByAccountId(accountId, 'all');
        const incomesByAccountId = await income.getIncomesByAccountId(accountId, 'all');

        // format urls into one array
        const twoDimensionalIncomeUrls = incomesByAccountId.map(income => income.photos);
        const twoDimensionalExpenseUrls = expensesByAccountId.map(expense => expense.photos);         
        const incomeUrls = [].concat(...twoDimensionalIncomeUrls);
        const expenseUrls = [].concat(...twoDimensionalExpenseUrls);
        const allUrls = [...incomeUrls, ...expenseUrls];

        // delete objects from s3
        if (allUrls.length > 0) {
            const deletedResponse = await deleteObjects(allUrls);
            console.log(deletedResponse);
        }

        // delete all related expenses
        const deletedExpenses = await expense.deleteAllExpensesByAccountId(accountId);

        // delete all related incomes
        const deletedIncomes = await income.deleteAllExpensesByAccountId(accountId);

        // delete the account
        const deleteAccount = account.deleteAccount(accountId);

        // if user has is deleted their default account select next available account as the default account
        const getUserById = await user.getUserById(userId);        
        if (getUserById.defaultAccount === accountId) {
            const nextAccountId = allAccounts[0]._id.toString();
            const updatedUser = await user.updateUser({
                defaultAccount: nextAccountId
            }, userId);
        }
        return deleteAccount;
        
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createAccount,
    getAccountsByCurrentAuthUser,
    getSingleAccountByCurrentAuthUser,
    updateAccount,
    deleteAccount
}