import React, { useEffect, useState } from "react";
import styles from './accountCard.module.scss';
import moment from "moment";
import { userAuthApi } from "../../../store/user/user.slice";
import { financeAccountApi } from "../../../store/financeAccount/financeAccount.slice";

import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";

export const AccountCard = () => {

    const [financeAccountState, setFinanceAccountState] = useState({});

    const {
        data: authData,
        isUninitialized: authIsUninitiated,
        isLoading: authIsLoading,
        isFetching: authIsFetching
    } = userAuthApi.endpoints.verifyAuth.useQueryState();

    const {
        data: accountData,
        isUninitialized: accountIsUninitiated,
        isLoading: accountIsLoading,
        isFetching: accountIsFetching
    } = financeAccountApi.endpoints.getAccounts.useQueryState();

    useEffect(() => {
        if (!authIsLoading && !authIsFetching && !authIsUninitiated && !accountIsFetching && !accountIsLoading && !accountIsUninitiated) {
            const currentAccount = accountData.data.find(account => account._id === authData.defaultAccount);
            setFinanceAccountState(currentAccount);
        }
    }, [accountData, authData])

    return (
        <div className={styles.cardWrapper}>
            {
                !authIsLoading && !authIsFetching && !authIsUninitiated && !accountIsFetching && !accountIsLoading && !accountIsUninitiated 
                ?
                (
                <>
                    <div className={styles.cardHeading}>
                        <p>Account</p>
                    </div>
        
                    <div className={styles.cardDetails}>
                        <p className={styles.amount}>{financeAccountState.value}</p>
                        <p className={styles.accountName}>{financeAccountState.name}</p>
                    </div>
        
                    <div className={styles.footer}>
                        <p>Last Updated</p>
                        <p>{financeAccountState.updatedAt}</p>
                    </div>
                </>   
                )
                :
                <LoadingSpinner />
            }
        </div>
    );
}