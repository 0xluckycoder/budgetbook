const AccountEntry = require('../models/AccountEntry');

const createAccount = async (account) => {
    try {
        const accountEntry = new AccountEntry(account);
        const createdAccountEntry = await accountEntry.save();
        return createdAccountEntry;
    } catch(error) {
        throw error;
    }
}

const getAccountById = async (id) => {
    try {
        const getAccountById = await AccountEntry.findOne({ _id: id });;
        return getAccountById;
    } catch (error) {
        throw error;
    }
}

const updateAccount = async (accountData, id) => {
    try {
        const accountEntry = await AccountEntry.updateOne({ _id: id }, { ...accountData });
        return accountEntry;
    } catch(error) {
        throw error;
    }
}

const deleteAccount = async (id) => {
    try {
        const accountEntry = await AccountEntry.deleteOne({ _id: id });
        return accountEntry;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    createAccount,
    getAccountById,
    updateAccount,
    deleteAccount
}