import React, { useEffect, useState } from "react";
import { userAuthApi } from "../../store/user/user.slice";
import { useNavigate, Navigate } from "react-router-dom";

export const Protected = ({ children }) => {
    const {
        data,
        isLoading,
        isFetching,
        isUninitialized
    } = userAuthApi.endpoints.verifyAuth.useQueryState();

    let isAuthLoading = isLoading && isFetching ? true : false;

    console.log(data);

    if (!isUninitialized) {
        if (isAuthLoading) {
            return <h1>fucking loading</h1>
        } else {
            if (!data) {
                return <Navigate to="/auth/login" replace={true} />
            } else {
                return children;
            }
        }
    }
}