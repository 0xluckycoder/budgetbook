import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const expenseApi = createApi({
    reducerPath: 'expense',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5500/api/v1' }),
    tagTypes: ['Expense'],
    endpoints: (build) => ({
        getExpense: build.query({
            query: (para) => `/expense?date=${para}`,
            providesTags: (result, error, arg) => result ? [...result.data.map(({ id }) => ({ type: 'Expense', id })), 'Expense'] : ['Expense'],
        }),
        addExpense: build.mutation({
            query: (initialExpense) => ({
                url: '/expense',
                method: 'POST',
                body: initialExpense
            }),
            invalidatesTags: ['Expense']
        }),
        uploadExpenseImage: build.mutation({
            query: (formData) => ({
                url: '/expense/image',
                method: 'POST',
                body: formData,
                credentials: "include"
            })
        })
    })
});

export const {
    useGetExpenseQuery,
    useAddExpenseMutation,
    useUploadExpenseImageMutation
} = expenseApi;

/*
// https://redux-toolkit.js.org/rtk-query/usage/automated-refetching
editPost: build.mutation({
    query: (body) => ({
    url: `post/${body.id}`,
    method: 'POST',
    body,
    }),
    invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
}),
*/ 

// export const queryStateResult = expenseApi.endpoints.getExpense.useQueryState();

// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//     value: [
//             {
//                 "_id":  "632ef958e2cc9ee3d291bba0",
//                 "userId": "111111",
//                 "title": "food",
//                 "amount": "2000",
//                 "category": "restaurant",
//                 "transactionDate": "2022-09-18",
//                 "comment": "my comment",
//                 "account": "my account"
//             },
//             {
//                 "_id":  "632ef9ff050a8eae527007c9",
//                 "userId": "111111",
//                 "title": "food",
//                 "amount": "1200",
//                 "category": "restaurant",
//                 "transactionDate": "2022-09-17",
//                 "comment": "my comment",
//                 "account": "my account"
//             },
//             {
//                 "_id": "632f03f7050a8eae527007ca",
//                 "userId": "111111",
//                 "title": "food",
//                 "amount": "600",
//                 "category": "restaurant",
//                 "transactionDate": "2022-09-16",
//                 "comment": "my comment",
//                 "account": "my account"
//             }
//       ]
// };

// export const expenseSlice = createSlice({
//     name: 'expense',
//     initialState,
//     reducers: {
//         addRecord: (state, action) => {
//             state.value.push(action.payload);
//         }
//     }
// });

// export const { addRecord } = expenseSlice.actions;
// export const selectExpense = (state) => state.expense.value;
// export default expenseSlice.reducer;