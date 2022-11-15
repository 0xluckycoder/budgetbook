const IncomeEntry = require('../models/IncomeEntry');
const moment = require('moment');

const createIncome = async (income) => {
    try {
        const incomeEntry = new IncomeEntry(income);
        const createdIncomeEntry = await incomeEntry.save();
        return createdIncomeEntry;
    } catch (error) {
        throw error;
    }
}

const getIncomesByAccountId = async (accountId, sortType) => {
    try {
        if (sortType === "7days") {
            const getIncome = await IncomeEntry.find({"transactionDate": {
                "$gte": moment().day(-6).format('YYYY-MM-DD'),
                "$lte": moment().day(0).format('YYYY-MM-DD')
            },
            accountId
            });
            return getIncome;
        } else if (sortType === "thismonth") {
            const firstDayOfThisMonth = moment().startOf('month').format('YYYY-MM-DD');
            const lastDayOfThisMonth = moment().endOf('month').format('YYYY-MM-DD');
    
            const getIncome = await IncomeEntry.find({"transactionDate": {
                "$gte": firstDayOfThisMonth,
                "$lte": lastDayOfThisMonth
            },
            accountId
            });
            return getIncome;
        } else if (sortType === "lastmonth") {
            const firstDayOfLastMonth = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'); 
            const lastDayOfFirstMonth = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
    
            const getIncome = await IncomeEntry.find({"transactionDate": {
                "$gte": firstDayOfLastMonth,
                "$lte": lastDayOfFirstMonth
            },
            accountId
            });
            return getIncome;
        } else if (sortType === "thisyear") {
            const firstDayOfThisYear = moment().startOf('year').format('YYYY-MM-DD');
            const lastDayOfThisYear = moment().day(0).format('YYYY-MM-DD');
    
            const getIncome = await IncomeEntry.find({"transactionDate": {
                "$gte": firstDayOfThisYear,
                "$lte": lastDayOfThisYear
            },
            accountId
            });
            return getIncome;
        } else if (sortType === "lastyear") {
            const firstDayOfLastYear = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');
            const lastDayOfLastYear = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');
    
            const getIncome = await IncomeEntry.find({"transactionDate": {
                "$gte": firstDayOfLastYear,
                "$lte": lastDayOfLastYear
            },
            accountId
            });
            return getIncome;
        } else if (sortType === "all") {
            const getIncome = await IncomeEntry.find({ accountId });
            return getIncome;
        } 
    } catch(error) {
        throw error;
    }
}

const getIncomeById = async (id) => {
    try {
        const getIncomeById = await IncomeEntry.findOne({ _id: id });;
        return getIncomeById;
    } catch (error) {
        throw error;
    }
}

const updateIncome = async (incomeId, incomeData) => {
    try {
        const incomeEntry = await IncomeEntry.updateOne({ _id: incomeId }, { ...incomeData });
        return incomeEntry;
    } catch(error) {
        throw error;
    }
}

const deleteIncome = async (id) => {
    try {
        const incomeEntry = await IncomeEntry.deleteOne({ _id: id });
        return incomeEntry;
    } catch (error) {
        throw error;
    }
}

const deleteAllExpensesByAccountId = async (id) => {
    try {
        const incomeEntry = await IncomeEntry.deleteMany({ accountId: id });
        return incomeEntry;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createIncome,
    getIncomesByAccountId,
    getIncomeById,
    updateIncome,
    deleteIncome,
    deleteAllExpensesByAccountId
}