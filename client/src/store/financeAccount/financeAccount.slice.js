import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const financeAccountApi = createApi({
    reducerPath: 'account',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5500/api/v1' }),
    tagTypes: ['Account'],
    endpoints: (build) => ({
        // getAccounts: build.query({
        //     query: () => `/account`,
        //     providesTags: (result, error, arg) => result ? [...result.data.map(({ id }) => ({ type: 'Account', id })), 'Account'] : ['Account'],
        // }),
        getAccountByUserId: build.query({
            query: (userId) => `/account/user/${userId}`,
            providesTags: (result, error, arg) => result ? [...result.data.map(({ id }) => ({ type: 'Account', id })), 'Account'] : ['Account'],
        }),
        getAccountById: build.query({
            query: (id) => `/account/${id}`,
            providesTags: (result, error, arg) => [{ type: 'Expense', id: arg }]
        }),
        addAccount: build.mutation({
            query: (accountData) => ({
                url: '/account',
                method: 'POST',
                body: accountData
            }),
            invalidatesTags: ['Account']
        }),
        editAccount: build.mutation({
            query: (patch) => ({
                url: `/account/${patch._id}`,
                method: 'PUT',
                body: patch
            })
        }),
        deleteAccount: build.mutation({
            query: (id) => ({
                url: `/account/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Account']
        })
    })
})

export const {
    // useGetAccountsQuery,
    useGetAccountByUserIdQuery,
    useGetAccountByIdQuery,
    useAddAccountMutation,
    useEditAccountMutation,
    useDeleteAccountMutation
} = financeAccountApi;