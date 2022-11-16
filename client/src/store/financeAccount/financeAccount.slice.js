import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { unAuthorizedErrors } from "../../utils/errorTypes";

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
            providesTags: (result, error, arg) => {
                if (error && unAuthorizedErrors.includes(error.data.message)) return ['Account']
                return result ? [...result.data.map(({ id }) => ({ type: 'Account', id })), 'Account'] : ['Account']
            },
            // no need transform response
        }),
        getAccountById: build.query({
            query: (id) => `/accounts/${id}`,
            providesTags: (result, error, arg) => [{ type: 'Account', id: arg }]
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
                body: patch,
                credentials: "include"
            }),
            invalidatesTags: ['Account']
        }),
        deleteAccount: build.mutation({
            query: (id) => ({
                url: `/accounts/${id}`,
                method: 'DELETE',
                credentials: "include"
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