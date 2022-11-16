import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { unAuthorizedErrors } from '../../utils/errorTypes';

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
            providesTags: (result, error, arg) => {
                if (error && unAuthorizedErrors.includes(error.data.message)) return ['Expense']
                return result.data ? [...result.data.map(({ id }) => ({ type: 'Expense', id })), 'Expense'] : ['Expense']
            },
            transformResponse: (res) => {
                return res.data;
            }
        }),
        getExpenseById: build.query({
            query: (id) => ({
                url: `/expenses/${id}`,
                credentials: "include"
            }),
            providesTags: (result, error, arg) => [{ type: 'Expense', id: arg }],
        }),
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
                url: '/expenses/uploads/image',
                method: 'POST',
                body: formData,
                credentials: "include"
            })
        }),
        editExpense: build.mutation({
            query: (patch) => ({
                url: `/expenses/${patch._id}`,
                method: 'PUT',
                body: patch,
                credentials: "include"
            }),
            invalidatesTags: ['Expense']
        }),
        deleteExpense: build.mutation({
            query: (id) => ({
                url: `/expenses/${id}`,
                method: 'DELETE',
                credentials: "include"
            }),
            invalidatesTags: ['Expense']
        })
    })
});

export const {
    useGetExpensesQuery,
    useAddExpenseMutation,
    useUploadExpenseImagesMutation,
    useEditExpenseMutation,
    useDeleteExpenseMutation
} = expenseApi;