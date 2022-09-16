const ExpenseEntry = require('../models/ExpenseEntry');

const createExpense = async (expense) => {
    try {
        const expenseEntry = new ExpenseEntry(expense);
        const createdExpenseEntry = await expenseEntry.save();
        return createdExpenseEntry;
    } catch (error) {
        throw error;
    }
}

const getExpenseById = async (id) => {
    try {
        const getExpenseById = await ExpenseEntry.findOne({ _id: id });;
        return getExpenseById;
    } catch (error) {
        throw error;
    }
}

const updateExpense = async (expenseData, id) => {
    try {
        const expenseEntry = await ExpenseEntry.updateOne({ _id: id }, { ...expenseData });
        return expenseEntry;
    } catch(error) {
        throw error;
    }
}

const deleteExpense = async (id) => {
    try {
        const expenseEntry = await ExpenseEntry.deleteOne({ _id: id });
        return expenseEntry;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createExpense,
    getExpenseById,
    updateExpense,
    deleteExpense
}