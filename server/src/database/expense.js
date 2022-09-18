const ExpenseEntry = require('../models/ExpenseEntry');
const moment = require('moment');

const createExpense = async (expense) => {
    try {
        const expenseEntry = new ExpenseEntry(expense);
        const createdExpenseEntry = await expenseEntry.save();
        return createdExpenseEntry;
    } catch (error) {
        throw error;
    }
}

const getExpenses = async (sortType) => {
    if (sortType === "7days") {
        // 2022-09-18T16:08:16.540+00:00
        // 2022-09-18T17:13:38.641Z
        const getExpense = await ExpenseEntry.find({"transactionDate": {
            "$lt": "2022-09-18T18:05:26.936"
        }});
        return getExpense;
    } else if (sortType === "thismonth") {

    } else if (sortType === "lastmonth") {

    } else if (sortType === "thisyear") {

    } else if (sortType === "lastyear") {

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
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}