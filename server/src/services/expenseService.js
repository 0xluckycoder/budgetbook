const expense = require('../database/expense');
const user = require('../database/user');
const account = require('../database/account');
const moment = require('moment');
const customError = require('../utils/customError');

// const sharp = require('sharp');
// const path = require('path');
// const fs = require('fs');
// const { 
//     S3Client, 
//     PutObjectCommand
// } = require('@aws-sdk/client-s3');
// const { v4: uuidv4 } = require('uuid');
// const customError = require('../utils/customError');


const createExpense = async (expenseData) => {
    try {
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

        const updateExpense = expense.updateExpense(expenseData, expenseId);
        return updateExpense;
    } catch(error) {
        throw error;
    }
}

const deleteExpense = async (userId, expenseId) => {
    try {
        // throw error if expense record not belong to the user
        const requestedExpense = await expense.getExpenseById(expenseId);
        if (requestedExpense.userId !== userId) throw customError('Unauthorized request', 'Unauthorized');        

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