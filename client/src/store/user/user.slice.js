import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userAuthApi = createApi({
    reducerPath: 'authAccount',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5500/api/v1' }),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        verifyAuth: build.query({
            query: () => `/auth/verifyAuth`,
        }),
        signIn: build.mutation({
            query: (signInData) => ({
                url: '/auth/signin',
                method: 'POST',
                body: signInData
            }),
        }),
        signUp: build.mutation({
            query: (signUpData) => ({
                url: '/auth/signup',
                method: 'POST',
                body: signUpData
            }),
        })
    }),
});

export const {
    useVerifyAuthQuery,
    useSignInMutation,
    useSignUpMutation,
} = userAuthApi;