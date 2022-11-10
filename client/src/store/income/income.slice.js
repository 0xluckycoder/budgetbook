import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const incomeApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5500/api/v1' }),
    tagTypes: ['Income'],
    endpoints: (build) => ({
        getIncomes: build.query({
            query: ({ accountId, para }) => ({
                url: `/incomes/accounts/${accountId}/?date=${para}`,
                credentials: "include"
            }),
            providesTags: (result, error, arg) => result.data ? [...result.data.map(({ id }) => ({ type: 'Income', id })), 'Income'] : ['Income'],
            transformResponse: (res) => {
                return res.data;
            }
        }),
        getIncomeById: build.query({
            query: (id) => ({
                url: `/expenses/${id}`,
                credentials: "include"
            }),
            providesTags: (result, error, arg) => [{ type: 'Income', id: arg }],
        }),
        addIncome: build.mutation({
            query: ({ accountId, incomeData }) => ({
                url: `/incomes/${accountId}`,
                method: 'POST',
                body: incomeData,
                credentials: "include"
            }),
            invalidatesTags: ['Income']
        }),
        uploadIncomeImages: build.mutation({
            query: (formData) => ({
                url: '/incomes/uploads/image',
                method: 'POST',
                body: formData,
                credentials: "include"
            })
        }),
        editIncome: build.mutation({
            query: (patch) => ({
                url: `/incomes/${patch._id}`,
                method: 'PUT',
                body: patch,
                credentials: "include"
            }),
            invalidatesTags: ['Income']
        }),
        deleteIncome: build.mutation({
            query: (id) => ({
                url: `/incomes/${id}`,
                method: 'DELETE',
                credentials: "include"
            }),
            invalidatesTags: ['Income']
        })
    }),
});

export const {
    useGetIncomesQuery,
    useAddIncomeMutation,
    useUploadIncomeImagesMutation,
    useEditIncomeMutation,
    useDeleteIncomeMutation
} = incomeApi;