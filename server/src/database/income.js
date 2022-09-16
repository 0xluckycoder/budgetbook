const IncomeEntry = require('../models/IncomeEntry');

const createIncome = async (income) => {
    try {
        const incomeEntry = new IncomeEntry(income);
        const createdIncomeEntry = await incomeEntry.save();
        return createdIncomeEntry;
    } catch (error) {
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

const updateIncome = async (incomeData, id) => {
    try {
        const incomeEntry = await IncomeEntry.updateOne({ _id: id }, { ...incomeData });
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

module.exports = {
    createIncome,
    getIncomeById,
    updateIncome,
    deleteIncome
}