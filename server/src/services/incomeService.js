const income = require('../database/income');
const account = require('../database/account');
const customError = require('../utils/customError');
const deleteObjects = require('../utils/deleteObjects');

// const sharp = require('sharp');
// const path = require('path');
// const fs = require('fs');
// const { 
//     S3Client, 
//     PutObjectCommand
// } = require('@aws-sdk/client-s3');
// const { v4: uuidv4 } = require('uuid');

const createIncome = async (incomeData) => {
    try {
        // fetch related account
        const relatedAccount = await account.getAccountById(incomeData.accountId);

        // update the account total
        const currentAccountValue = parseInt(relatedAccount.value);
        const incomeValue = parseInt(incomeData.amount);
        const newAccountValue = currentAccountValue + incomeValue;
        relatedAccount.value = newAccountValue.toString();

        const updatedAccount = await account.updateAccount({
            value: relatedAccount.value
        }, incomeData.accountId);   

        // create income
        const createIncome = await income.createIncome(incomeData);
        return createIncome;
    } catch(error) {
        throw error;
    }
}

const getIncomesByAccountId = async (userId, accountId, sortType) => {
    try {
        // throw error if requested income account not belong to the user
        const requestedAccount = await account.getAccountsByCurrentAuthUser(accountId);
        if (requestedAccount.userId === userId) throw customError('Unauthorized request', 'Unauthorized');

        const incomesByAccountId = await income.getIncomesByAccountId(accountId, sortType);
        return incomesByAccountId;
    } catch(error) {
        throw error;
    }
}

const getIncomeById = async (userId, incomeId) => {
    try {
        // throw error if requested income does not belong to the current user
        const requestedIncome = await income.getIncomeById(incomeId);
        if (requestedIncome.userId !== userId) throw customError('Unauthorized request', 'Unauthorized');

        return requestedIncome;
    } catch (error) {
        throw error;
    }
}

const updateIncome = async (userId, incomeId, incomeData) => {
    try {

        // throw error if income record does't belong to the user
        const requestedIncome = await income.getIncomeById(incomeId);
        if (requestedIncome.userId !== userId) throw customError('Unauthorized request', 'Unauthorized');

        // fetch related account
        const relatedAccount = await account.getAccountById(incomeData.accountId);

        // calculate new total account value
        const currentAccountValue = parseInt(relatedAccount.value);
        const currentIncomeValue = parseInt(requestedIncome.amount);
        const newIncomeValue = parseInt(incomeData.amount);
        const newAccountValue = currentAccountValue - currentIncomeValue + newIncomeValue;

        // update new account value
        const updatedAccount = await account.updateAccount({
            value: newAccountValue.toString()
        }, incomeData.accountId);   


        const updateIncome = income.updateIncome(incomeId, incomeData);
        return updateIncome;
    } catch(error) {
        throw error;
    }
}

const deleteIncome = async (userId, incomeId) => {
    try {
        // throw error if income record does't belong to the user
        const requestedIncome = await income.getIncomeById(incomeId);
        if (requestedIncome.userId !== userId) throw customError('Unauthorized request', 'Unauthorized');

        // delete objects from s3
        if (requestedIncome.photos.length > 0) {
            const deletedResponse = await deleteObjects(requestedIncome.photos);
            console.log(deletedResponse);
        }

        // fetch related account
        const relatedAccount = await account.getAccountById(requestedIncome.accountId);

        // calculate new total account value
        const currentAccountValue = parseInt(relatedAccount.value);
        const incomeValue = parseInt(requestedIncome.amount);
        const newAccountValue = currentAccountValue - incomeValue;

        // update new account value
        const updatedAccount = account.updateAccount({
            value: newAccountValue.toString()
        }, requestedIncome.accountId);
        
        const deleteIncome = income.deleteIncome(incomeId);
        return deleteIncome;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createIncome,
    getIncomesByAccountId,
    getIncomeById,
    updateIncome,
    deleteIncome
}