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

module.exports = {
    createExpense,
    getExpenseById
}