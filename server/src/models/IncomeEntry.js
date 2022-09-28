const mongoose = require('mongoose');
const { Schema } = mongoose;

const incomeEntrySchema = new Schema({
    userId: {
        type: String,
        // required: true
    },
    title: {
        type: String
    },
    amount: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    transactionDate: {
        type: Date,
        required: true
    },
    photos: {
        type: Array,
    },
    comment: {
        type: String
    },
    account: {
        type: String,
        required: true
    }
}, { timestamps: true });

const IncomeEntry = mongoose.model('IncomeEntry', incomeEntrySchema);

module.exports = IncomeEntry;