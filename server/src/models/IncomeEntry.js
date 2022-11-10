const mongoose = require('mongoose');
const { Schema } = mongoose;

const incomeEntrySchema = new Schema({
    userId: {
        type: String,
    },
    accountId: {
        type: String,
    },
    title: {
        type: String
    },
    amount: {
        type: String
    },
    category: {
        type: String
    },
    transactionDate: {
        type: String,
    },
    photos: {
        type: Array,
    },
    comment: {
        type: String
    }
}, { timestamps: true });

const IncomeEntry = mongoose.model('IncomeEntry', incomeEntrySchema);

module.exports = IncomeEntry;