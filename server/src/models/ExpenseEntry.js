const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseEntrySchema = new Schema({
    userId: {
        type: String,
    },
    accountId: {
        type: String,
    },
    title: {
        type: String,
    },
    amount: {
        type: String,
    },
    category: {
        type: String,
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

const ExpenseEntry = mongoose.model('ExpenseEntry', expenseEntrySchema);

module.exports = ExpenseEntry;