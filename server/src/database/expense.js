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
// http://localhost:5500/api/v1/expense?date=7days
const getExpensesByAccountId = async (accountId, sortType) => {
    try {
        if (sortType === "7days") {
            const getExpense = await ExpenseEntry.find({"transactionDate": {
                "$gte": moment().day(-6).format('YYYY-MM-DD'),
                "$lte": moment().day(0).format('YYYY-MM-DD')
            },
            accountId
            });
            return getExpense;
        } else if (sortType === "thismonth") {
            const firstDayOfThisMonth = moment().startOf('month').format('YYYY-MM-DD');
            const lastDayOfThisMonth = moment().endOf('month').format('YYYY-MM-DD');
    
            const getExpense = await ExpenseEntry.find({"transactionDate": {
                "$gte": firstDayOfThisMonth,
                "$lte": lastDayOfThisMonth
            },
            accountId
            });
            return getExpense;
        } else if (sortType === "lastmonth") {
            const firstDayOfLastMonth = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'); 
            const lastDayOfFirstMonth = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
    
            const getExpense = await ExpenseEntry.find({"transactionDate": {
                "$gte": firstDayOfLastMonth,
                "$lte": lastDayOfFirstMonth
            },
            accountId
            });
            return getExpense;
        } else if (sortType === "thisyear") {
            const firstDayOfThisYear = moment().startOf('year').format('YYYY-MM-DD');
            const lastDayOfThisYear = moment().endOf('year').format('YYYY-MM-DD');
    
            const getExpense = await ExpenseEntry.find({"transactionDate": {
                "$gte": firstDayOfThisYear,
                "$lte": lastDayOfThisYear
            },
            accountId
            });
            return getExpense;
        } else if (sortType === "lastyear") {
            const firstDayOfLastYear = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');
            const lastDayOfLastYear = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');
    
            const getExpense = await ExpenseEntry.find({"transactionDate": {
                "$gte": firstDayOfLastYear,
                "$lte": lastDayOfLastYear
            },
            accountId
            });
            return getExpense;
        } else if (sortType === "all") {
            const getIncome = await ExpenseEntry.find({ accountId });
            return getIncome;
        } 
    } catch(error) {
        throw error;
    }
}

const getExpenseById = async (id) => {
    try {
        // console.log('came here', id);
        const getExpenseById = await ExpenseEntry.findById(id);
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

const deleteAllExpensesByAccountId = async (id) => {
    try {
        const expenseEntry = await ExpenseEntry.deleteMany({ accountId: id });
        return expenseEntry;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createExpense,
    getExpensesByAccountId,
    getExpenseById,
    updateExpense,
    deleteExpense,
    deleteAllExpensesByAccountId
}