import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const expenseApi = createApi({
    reducerPath: 'expense',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5500/api/v1' }),
    tagTypes: ['Expense'],
    endpoints: (build) => ({
        getExpenses: build.query({
            query: ({ accountId, para }) => ({
                url: `/expenses/accounts/${accountId}/?date=${para}`,
                credentials: "include"
            }),
            providesTags: (result, error, arg) => result.data ? [...result.data.map(({ id }) => ({ type: 'Expense', id })), 'Expense'] : ['Expense'],
            transformResponse: (res) => {
                return res.data;
            }
            // query: ({ accountId, para }) => `/expenses/accounts/${accountId}/?date=${para}`,
            // providesTags: (result, error, arg) => result ? [...result.data.map(({ id }) => ({ type: 'Expense', id })), 'Expense'] : ['Expense'],
        }),
        // getExpenseById: build.query({
        //     query: (id) => `/expense/${id}`,
        //     providesTags: (result, error, arg) => [{ type: 'Expense', id: arg }]
        // }),
        addExpense: build.mutation({
            query: ({ accountId, expenseData }) => ({
                url: `/expenses/${accountId}`,
                method: 'POST',
                body: expenseData,
                credentials: "include"
            }),
            invalidatesTags: ['Expense']
        }),
        uploadExpenseImages: build.mutation({
            query: (formData) => ({
                url: '/expense/image',
                method: 'POST',
                body: formData,
                credentials: "include"
            })
        }),
        editExpense: build.mutation({
            query: (patch) => ({
                url: `/expense/${patch._id}`,
                method: 'PUT',
                body: patch
            }),
            invalidatesTags: ['Expense']
        }),
        deleteExpense: build.mutation({
            query: (id) => ({
                url: `/expense/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Expense']
        })
    })
});

/*
    getPost: build.query<Post, string>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
*/ 

export const {
    useGetExpensesQuery,
    useAddExpenseMutation,
    useUploadExpenseImagesMutation,
    useEditExpenseMutation,
    useDeleteExpenseMutation
} = expenseApi;