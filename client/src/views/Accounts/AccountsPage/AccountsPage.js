import React, { useState } from "react";
import { AppLayout } from "../../../components/layout/AppLayout";
import { Col, Row, Button, Radio } from 'antd';
import { AccountTotalCard } from "../AccountTotalCard/AccountTotalCard";
import { AddAccountModal } from "../AddAccountModal/AddAccountModal";
import { AccountCardSelect } from "../AccountCardSelect/AccountCardSelect";
import styles from './accountPage.module.scss';
import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";

import { 
    financeAccountApi,
    useGetAccountsQuery,
    useAddAccountMutation
} from "../../../store/financeAccount/financeAccount.slice";
import { userAuthApi, useUpdateUserAttributesMutation } from "../../../store/user/user.slice";

const AccountPage = () => {

    // add account modal state
    const [addAccountState, setAddAccountState] = useState(false);

    // select account loader
    const [selectLoader, setSelectLoader] = useState(false);


    // manual triggers
    const [
        financeAccountsApiTrigger,
        financeAccountsResult
    ] = financeAccountApi.endpoints.getAccounts.useLazyQuery();
    const [
        authApiTrigger,
        authApiResult
    ] = userAuthApi.endpoints.verifyAuth.useLazyQuery();

    const {
        data: accountData,
        isLoading,
        isFetching,
        // refetch: refetchAccounts
    } = useGetAccountsQuery();

    const {
        data: authData,
        isUninitialized: authIsUninitiated,
        isLoading: authIsLoading,
        // refetch: refetchUser
    } = userAuthApi.endpoints.verifyAuth.useQueryState();

    const [addAccount] = useAddAccountMutation();

    const [updateUserAttributes] = useUpdateUserAttributesMutation();

    // send account add request
    const handleAddAccount = async (data) => {
        try {
            await addAccount(data).unwrap();
        } catch(error) {
            console.log(error);
        }
    }

    let isContentLoading = isLoading && isFetching ? true : false;
    
    const handleAccountSelect = async (accountId) => {
        // console.log('account selected', accountId);
        if (authData.defaultAccount !== accountId) {

            setSelectLoader(true);

            try {
                await updateUserAttributes({ 
                    defaultAccount: accountId 
                }).unwrap();

                financeAccountsApiTrigger();
                authApiTrigger();

            } catch (error) {
                console.log(error);
            }

            setSelectLoader(false);
        }
    }

    return (
        <AppLayout>
            {
            isContentLoading || selectLoader ?
            <LoadingSpinner />
            :
            <>
            <h2 className={styles.heading}>Accounts</h2>
            <div className={styles.accounts}>
                <Row gutter={12}>
                    <Col lg={12} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <AccountTotalCard />
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                    </Col>
                </Row>

                <br/>

                <h2 className={styles.heading}>List of Accounts</h2>

                <Button 
                    className={`themed-button ${styles.addAccountBtn}`}
                    onClick={() => setAddAccountState(true)}
                >
                    Add Account
                </Button>

                {/* Add finance Account Modal */}
                <AddAccountModal 
                    addAccountState={addAccountState} 
                    handleAddAccount={handleAddAccount} 
                    setAddAccountState={setAddAccountState} 
                />

                <Row gutter={20}>
                    {
                        accountData.data.map((account, index) => (
                            <Col key={index} lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                                <AccountCardSelect
                                    handleAccountSelect={handleAccountSelect} 
                                    defaultAccount={authData.defaultAccount} 
                                    itemData={account} 
                                />
                            </Col>
                        ))
                    }
                </Row>
            </div>
            </>
            }

        </AppLayout>
    );
}

export default AccountPage;