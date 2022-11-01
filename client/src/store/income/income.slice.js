import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const incomeApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5500/api/v1' }),
    tagTypes: ['Income'],
    endpoints: (build) => ({
        getIncomes: build.query({
            query: (para) => `/income?date=${para}`,
            providesTags: (result, error, arg) => result ? [...result.data.map(({ id }) => ({ type: 'Income', id })), 'Income'] : ['Income'],
        }),
        addIncome: build.mutation({
            query: (initialIncome) => ({
                url: '/income',
                method: 'POST',
                body: initialIncome,
                credentials: "include"
            }),
            invalidatesTags: ['Income']
        }),
        uploadIncomeImages: build.mutation({
            query: (formData) => ({
                url: '/income/image',
                method: 'POST',
                body: formData,
                credentials: "include"
            })
        }),
        editIncome: build.mutation({
            query: (patch) => ({
                url: `/income/${patch._id}`,
                method: 'PUT',
                body: patch,
                credentials: "include"
            }),
            invalidatesTags: ['Income']
        }),
        deleteIncome: build.mutation({
            query: (id) => ({
                url: `/income/${id}`,
                method: 'DELETE',
                credentials: "include"
            }),
            invalidatesTags: ['Income']
        })
    }),
});

/*
        signIn: build.mutation({
            query: (signInData) => ({
                url: '/auth/signin',
                method: 'POST',
                body: signInData,
                credentials: "include"
            }),
            transformResponse: (res) => {
                return res.userData;
            }
        }),
*/ 

export const {
    useGetIncomesQuery,
    useAddIncomeMutation,
    useUploadIncomeImagesMutation,
    useEditIncomeMutation,
    useDeleteIncomeMutation
} = incomeApi;