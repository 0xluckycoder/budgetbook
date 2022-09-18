const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseEntrySchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    transactionDate: {
        type: Date,
        required: true
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
        type: String,
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

const ExpenseEntry = mongoose.model('ExpenseEntry', expenseEntrySchema);

module.exports = ExpenseEntry;