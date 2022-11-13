import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userAuthApi = createApi({
    reducerPath: 'authAccount',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5500/api/v1' }),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        verifyAuth: build.query({
            query: () => ({
                url: '/auth/verifyAuth',
                credentials: "include"
            }),
            transformResponse: (res) => {
                return res.data;
            }
        }),
        signIn: build.mutation({
            query: (signInData) => ({
                url: '/auth/signin',
                method: 'POST',
                body: signInData,
                credentials: "include"
            }),
            transformResponse: (res) => {
                return res.data;
            }
        }),
        signUp: build.mutation({
            query: (signUpData) => ({
                url: '/auth/signup',
                method: 'POST',
                body: signUpData
            }),
        }),
        getUserAttributes: build.query({
            query: () => ({
                url: '/auth/users',
                credentials: "include"
            }),
            transformResponse: (res) => {
                return res.data;
            }
        }),
        updateUserAttributes: build.mutation({
            query: (updateData) => ({
                url: '/auth/users',
                method: 'PUT',
                credentials: "include",
                body: updateData
            }),
            invalidatesTags: ['Account']
        })
    }),
});

export const {
    useVerifyAuthQuery,
    useSignInMutation,
    useSignUpMutation,
    useGetUserAttributesQuery,
    useUpdateUserAttributesMutation
} = userAuthApi;

/*

if auth error occurred manually clear the state data

*/ 