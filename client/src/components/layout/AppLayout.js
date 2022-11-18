import React, { useState, useContext, createContext } from "react";
import { TopNav } from "../TopNav/TopNav";
import { SideNav } from "../SideNav/SideNav";

import { userAuthApi } from "../../store/user/user.slice";

import { unAuthorizedErrors } from "../../utils/errorTypes";

import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';


export const SideNavContext = createContext();

export const AppLayout = ({ children }) => {

    const [active, setActive] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        data: authData,
        isUninitialized: authIsUninitiated,
        isLoading: authIsLoading,
        isError: isAuthError,
        error: authError
    } = userAuthApi.endpoints.verifyAuth.useQueryState();

    /**
     * clear auth and redirect to login page if request is unauthorized
     * @param { error: { data: { message: "error message" } } }
     * */
    const logOutUnauthorizedRequests = (errorObj) => {
        if (errorObj.error) {
            if (unAuthorizedErrors.includes(errorObj.error.data.message)) {
                dispatch(userAuthApi.util.updateQueryData("verifyAuth", undefined, (draftPosts) => {
                        return draftPosts = {}
                }));
                navigate('/auth/login');
            }
        }
    }

    logOutUnauthorizedRequests({ error: authError });

    return (
        <div>
            <SideNavContext.Provider value={{active , setActive}}>
                <TopNav hamburger={true} authData={authData} />
                <SideNav />
                <div className="app-layout">
                    <div className="container">
                        {children}
                    </div>
                </div>
            </SideNavContext.Provider>
        </div>
    );
}