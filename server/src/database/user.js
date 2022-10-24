const UserEntry = require('../models/UserEntry');

const createUser = async (user) => {
    try {
        const userEntry = new UserEntry(user);
        const createdUserEntry = userEntry.save();
        return createdUserEntry;
    } catch(error) {
        throw error;
    }
}

const getUserBySubId = async (subId) => {
    try {
        const getUserBySubId = await UserEntry.findOne({ authorizeSubId: subId });
        return getUserBySubId;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUserBySubId
};