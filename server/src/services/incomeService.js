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
        const createExpense = await income.createIncome(incomeData);
        return createExpense;
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

        console.log(requestedIncome.photos.length > 0, 'requested income')

        // delete objects from s3
        if (requestedIncome.photos.length > 0) {
            const deletedResponse = await deleteObjects(requestedIncome.photos);
            console.log(deletedResponse);
        }
        
        const deleteIncome = income.deleteIncome(incomeId);
        console.log(deleteIncome);
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