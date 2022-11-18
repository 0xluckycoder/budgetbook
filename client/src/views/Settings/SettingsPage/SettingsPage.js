import React, { useState } from "react";
import { AppLayout } from "../../../components/layout/AppLayout";
import { UserProfile } from '../UserProfile/UserProfile';
import { AppSettings } from '../AppSettings/AppSettings';
import { Button } from 'antd';
import styles from './settingsPage.module.scss';
import { userAuthApi } from "../../../store/user/user.slice";

import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { useLazyLogoutQuery } from "../../../store/user/user.slice";
import { unAuthorizedErrors } from "../../../utils/errorTypes";

const SettingsPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [
        logoutApiTrigger,
        logoutApiResult
    ] = useLazyLogoutQuery();

    const {
        data: authData
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

    logOutUnauthorizedRequests(logoutApiResult);

    // logout from app
    const logoutUser = () => {
        logoutApiTrigger();
        dispatch(userAuthApi.util.updateQueryData("verifyAuth", undefined, (draftPosts) => {
                return draftPosts = {}
        }));
        navigate('/auth/login');
    };

    return (
        <AppLayout>
            <h2 className={styles.heading}>Settings</h2>
            <div className={styles.settings}>
                <UserProfile userData={authData} />
                <Button onClick={() => logoutUser()} className={`red-button ${styles.button}`}>Logout</Button>
                <AppSettings userData={authData} />
            </div>
        </AppLayout>
    );
}

export default SettingsPage;