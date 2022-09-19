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
    try {
        if (sortType === "7days") {
            const getExpense = await ExpenseEntry.find({"transactionDate": {
                "$gte": moment().day(-6).format('YYYY-MM-DD'),
                "$lte": moment().day(0).format('YYYY-MM-DD')
            }});
            return getExpense;
        } else if (sortType === "thismonth") {
            const firstDayOfThisMonth = moment().startOf('month').format('YYYY-MM-DD');
            const lastDayOfThisMonth = moment().endOf('month').format('YYYY-MM-DD');
    
            const getExpense = await ExpenseEntry.find({"transactionDate": {
                "$gte": firstDayOfThisMonth,
                "$lte": lastDayOfThisMonth
            }});
            return getExpense;
        } else if (sortType === "lastmonth") {
            const firstDayOfLastMonth = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'); 
            const lastDayOfFirstMonth = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
    
            const getExpense = await ExpenseEntry.find({"transactionDate": {
                "$gte": firstDayOfLastMonth,
                "$lte": lastDayOfFirstMonth
            }});
            return getExpense;
        } else if (sortType === "thisyear") {
            const firstDayOfThisYear = moment().startOf('year').format('YYYY-MM-DD');
            const lastDayOfThisYear = moment().day(0).format('YYYY-MM-DD');
    
            const getExpense = await ExpenseEntry.find({"transactionDate": {
                "$gte": firstDayOfThisYear,
                "$lte": lastDayOfThisYear
            }});
            return getExpense;
        } else if (sortType === "lastyear") {
            const firstDayOfLastYear = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');
            const lastDayOfLastYear = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');
    
            const getExpense = await ExpenseEntry.find({"transactionDate": {
                "$gte": firstDayOfLastYear,
                "$lte": lastDayOfLastYear
            }});
            return getExpense;
        }
    } catch(error) {
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
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
}