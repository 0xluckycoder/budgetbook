const expense = require('../database/expense');

const createExpense = async (expenseData) => {
    try {
        const createExpense = await expense.createExpense(expenseData);
        return createExpense;
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
    getExpenseById,
    updateExpense,
    deleteExpense
}