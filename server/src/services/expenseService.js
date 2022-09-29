const expense = require('../database/expense');
const moment = require('moment');

const createExpense = async (expenseData) => {
    try {
        // add transaction date in ISO format
        // expenseData.transactionDate = moment().day(0).format('YYYY-MM-DD');
        const createExpense = await expense.createExpense(expenseData);
        return createExpense;
    } catch(error) {
        throw error;
    }
}

const getExpenses = async (sortType) => {
    try {
        const getExpense = await expense.getExpenses(sortType);
        return getExpense;
    } catch(error) {
        throw error;
    }
}

const getExpenseById = async (id) => {
    try {
        const getExpenseById = await expense.getExpenseById(id);
        return getExpenseById;
    } catch (error) {
        throw error;
    }
}

const updateExpense = async (expenseData, id) => {
    try {
        const updateExpense = expense.updateExpense(expenseData, id);
        return updateExpense;
    } catch(error) {
        throw error;
    }
}

const deleteExpense = async (id) => {
    try {
        const deleteExpense = expense.deleteExpense(id);
        return deleteExpense;
    } catch(error) {
        throw error;
    }
}



module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}