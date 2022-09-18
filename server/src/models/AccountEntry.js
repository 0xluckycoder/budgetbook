const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountEntrySchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true   
    },
    value: {
        type: String,
        required: true
    },
    currencyType: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true });

const AccountEntry = mongoose.model('AccountEntry', accountEntrySchema);

module.exports = AccountEntry;