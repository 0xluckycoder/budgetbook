import { createSlice } from "@reduxjs/toolkit";
// import expenseData from './data.json';

// const data = JSON.stringify(expenseData);

const initialState = {
    value: [
            {
                "_id":  "632ef958e2cc9ee3d291bba0",
                "userId": "111111",
                "title": "food",
                "amount": "2000",
                "category": "restaurant",
                "transactionDate": "2022-09-18",
                "comment": "my comment",
                "account": "my account"
            },
            {
                "_id":  "632ef9ff050a8eae527007c9",
                "userId": "111111",
                "title": "food",
                "amount": "1200",
                "category": "restaurant",
                "transactionDate": "2022-09-17",
                "comment": "my comment",
                "account": "my account"
            },
            {
                "_id": "632f03f7050a8eae527007ca",
                "userId": "111111",
                "title": "food",
                "amount": "600",
                "category": "restaurant",
                "transactionDate": "2022-09-16",
                "comment": "my comment",
                "account": "my account"
            }
      ]
};

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addRecord: (state, action) => {
            state.value.push(action.payload);
        }
    }
});

export const { addRecord } = expenseSlice.actions;

export const selectExpense = (state) => state.expense.value;

export default expenseSlice.reducer;