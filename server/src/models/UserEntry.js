const mongoose = require('mongoose');
const { Schema } = mongoose;

const userEntrySchema = new Schema({
    authorizeSubId: {
        type: String,
        required: true
    },
    language: {
        type: String
    },
    currency: {
        type: String
    },
    defaultAccount: {
        type: String
    },
    defaultSortPeriod: {
        type: String
    }
});

const UserEntry = mongoose.model('UserEntry', userEntrySchema);

module.exports = UserEntry;