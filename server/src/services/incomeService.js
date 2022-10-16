const income = require('../database/income');

// const sharp = require('sharp');
// const path = require('path');
// const fs = require('fs');
// const { 
//     S3Client, 
//     PutObjectCommand
// } = require('@aws-sdk/client-s3');
// const { v4: uuidv4 } = require('uuid');

const createIncome = async (incomeData) => {
    try {
        const createExpense = await income.createIncome(incomeData);
        return createExpense;
    } catch(error) {
        throw error;
    }
}

const getIncomes = async (sortType) => {
    try {
        const getIncome = await income.getIncomes(sortType);
        return getIncome;
    } catch(error) {
        throw error;
    }
}

const getIncomeById = async (id) => {
    try {
        const getIncomeById = await income.getIncomeById(id);
        return getIncomeById;
    } catch (error) {
        throw error;
    }
}

const updateIncome = async (incomeData, id) => {
    try {
        const updateIncome = income.updateIncome(incomeData, id);
        return updateIncome;
    } catch(error) {
        throw error;
    }
}

const deleteIncome = async (id) => {
    try {
        const deleteIncome = income.deleteIncome(id);
        return deleteIncome;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createIncome,
    getIncomes,
    getIncomeById,
    updateIncome,
    deleteIncome
}