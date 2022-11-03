const account = require('../database/account');

const createAccount = async (accountData) => {
    try {
        const createAccount = await account.createAccount(accountData);
        return createAccount;
    } catch(error) {
        throw error;
    }
}

const getAccountById = async (id) => {
    try {
        const getAccountById = await account.getAccountById(id);
        return getAccountById;
    } catch (error) {
        throw error;
    }
}

// const getAccountsByUserId = async (id) => {
//     try {
//         const getAccountsByUserId = await account.getAccountsByUserId(id);
//         return getAccountsByUserId;
//     } catch(error) {
//         throw error;
//     }
// }

const getAccountsByCurrentAuthUser = async (id) => {
    try {
        const getAccountsByCurrentAuthUser = await account.getAccountsByCurrentAuthUser();
        return getAccountsByCurrentAuthUser;
    } catch(error) {

    }
}

const updateAccount = async (accountData, id) => {
    try {
        const updateAccount = account.updateAccount(accountData, id);
        return updateAccount;
    } catch(error) {
        throw error;
    }
}

const deleteAccount = async (id) => {
    try {
        const deleteAccount = account.deleteAccount(id);
        return deleteAccount;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createAccount,
    getAccountById,
    // getAccountsByUserId,
    getAccountsByCurrentAuthUser,
    updateAccount,
    deleteAccount
}