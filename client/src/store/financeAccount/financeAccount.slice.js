import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const financeAccountApi = createApi({
    reducerPath: 'account',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5500/api/v1' }),
    tagTypes: ['Account'],
    endpoints: (build) => ({
        getAccounts: build.query({
            query: () => ({
                url: `/accounts`,
                credentials: "include"
            }),
            providesTags: (result, error, arg) => result ? [...result.data.map(({ id }) => ({ type: 'Account', id })), 'Account'] : ['Account'],
        }),
        getAccountById: build.query({
            query: (id) => `/accounts/${id}`,
            providesTags: (result, error, arg) => [{ type: 'Expense', id: arg }]
        }),
        addAccount: build.mutation({
            query: (accountData) => ({
                url: '/accounts',
                method: 'POST',
                body: accountData,
                credentials: "include"
            }),
            invalidatesTags: ['Account']
        }),
        editAccount: build.mutation({
            query: (patch) => ({
                url: `/accounts/${patch._id}`,
                method: 'PUT',
                body: patch
            })
        }),
        deleteAccount: build.mutation({
            query: (id) => ({
                url: `/accounts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Account']
        })
    })
})

export const {
    useGetAccountsQuery,
    useGetAccountByIdQuery,
    useAddAccountMutation,
    useEditAccountMutation,
    useDeleteAccountMutation
} = financeAccountApi;