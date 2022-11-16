import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { userAuthApi } from "../../store/user/user.slice";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export const AuthRedirect = ({ children }) => {
    const {
        data,
        isLoading,
        isFetching,
        isUninitialized
    } = userAuthApi.endpoints.verifyAuth.useQueryState();

    let isAuthLoading = isLoading || isFetching ? true : false;

    if (!isUninitialized) {
        if (isAuthLoading) {
            return (
                <div>
                    <LoadingSpinner />
                </div>
            )
        } else {
            if (!data || !data.subId) {
                return children;
            } else {
                return <Navigate to="/app/home" replace={true} />
            }
        }
    }

}