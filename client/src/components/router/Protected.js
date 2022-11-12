import React, { useEffect, useState } from "react";
import { userAuthApi } from "../../store/user/user.slice";
import { useNavigate, Navigate } from "react-router-dom";
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export const Protected = ({ children }) => {
    const {
        data,
        isLoading,
        isFetching,
        isUninitialized
    } = userAuthApi.endpoints.verifyAuth.useQueryState();

    let isAuthLoading = isLoading && isFetching ? true : false;
    
    if (!isUninitialized) {
        if (isAuthLoading) {
            return (
                <div>
                    <LoadingSpinner />
                </div>
            )
        } else {
            if (!data) {
                return <Navigate to="/auth/login" replace={true} />
            } else {
                return children;
            }
        }
    }
}