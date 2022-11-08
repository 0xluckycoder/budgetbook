const mongoose = require('mongoose');
const { Schema } = mongoose;

const userEntrySchema = new Schema({
    authorizeSubId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    defaultAccount: {
        type: String,
        required: true
    },
    defaultSortPeriod: {
        type: String
    }
});

const UserEntry = mongoose.model('UserEntry', userEntrySchema);

module.exports = UserEntry;