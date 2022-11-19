import React, { useState } from "react";
import { AppLayout } from "../../../components/layout/AppLayout";
import { Col, Row, Button, Radio } from 'antd';
import { AccountTotalCard } from "../AccountTotalCard/AccountTotalCard";
import { AddModal } from '../Modals/AddModal/AddModal';
import { AccountCardSelect } from "../AccountCardSelect/AccountCardSelect";
import styles from './accountPage.module.scss';
import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";
import { DialogueCard } from "../../../components/DialogueCard/DialogueCard";
import { WarningDialogueCard } from "../../../components/WarningDialogueCard/WarningDialogueCard";

import { 
    financeAccountApi,
    useGetAccountsQuery,
    useAddAccountMutation
} from "../../../store/financeAccount/financeAccount.slice";
import { userAuthApi, useUpdateUserAttributesMutation } from "../../../store/user/user.slice";
import { useDeleteAccountMutation } from "../../../store/financeAccount/financeAccount.slice";

import { unAuthorizedErrors } from "../../../utils/errorTypes";

import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";


const AccountPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // add account modal state
    const [addAccountState, setAddAccountState] = useState(false);

    // select account loader
    const [selectLoader, setSelectLoader] = useState(false);

    // api errors dialogue box
    const [apiErrorDialogueBox, setApiErrorDialogueBox] = useState(false);

    // manual triggers
    const [
        financeAccountsApiTrigger,
        financeAccountApiResult
    ] = financeAccountApi.endpoints.getAccounts.useLazyQuery();
    
    const [
        authApiTrigger,
        authApiResult
    ] = userAuthApi.endpoints.verifyAuth.useLazyQuery();
    
    const [
        addAccount,
        {
            error: addAccountError
        }
    ] = useAddAccountMutation();
    
    const [
        updateUserAttributes,
        {
            error: updateAttributesError
        }
    ] = useUpdateUserAttributesMutation();
    
    const [
        deleteAccount,
        {
            error: deleteAccountError
        }
    ] = useDeleteAccountMutation();
    
    const { data: authData } = userAuthApi.endpoints.verifyAuth.useQueryState();

    const {
        data: accountData,
        isLoading,
        isFetching,
        error: getAccountsError
    } = useGetAccountsQuery();

    /**
     * clear auth and redirect to login page if request is unauthorized
     * @param { error: { data: { message: "error message" } } }
     * */
    const logOutUnauthorizedRequests = (errorObj) => {
        if (errorObj.error) {
            // if (errorObj.error.data) {
                if (unAuthorizedErrors.includes(errorObj.error.data.message)) {
                    dispatch(userAuthApi.util.updateQueryData("verifyAuth", undefined, (draftPosts) => {
                            return draftPosts = {}
                    }));
                    navigate('/auth/login');
                }
            // }
        }
    }

    logOutUnauthorizedRequests(financeAccountApiResult);
    logOutUnauthorizedRequests(authApiResult);
    logOutUnauthorizedRequests({ error: addAccountError });
    logOutUnauthorizedRequests({ error: updateAttributesError });
    logOutUnauthorizedRequests({ error: deleteAccountError });
    logOutUnauthorizedRequests({ error: getAccountsError });

    // send account add request
    const handleAddAccount = async (data) => {
        try {
            await addAccount(data).unwrap();
        } catch(error) {
            console.log(error);
        }
    }

    // send delete request
    const handleDelete = async (id) => {
        setSelectLoader(true);
        try {
            await deleteAccount(id).unwrap();
            financeAccountsApiTrigger();
            authApiTrigger();
        } catch (error) {
            console.log(error);
            if (error.data.message === "cannot delete last available account") {
                setApiErrorDialogueBox(true);
            }
        }
        setSelectLoader(false);
    }

    let isContentLoading = isLoading || isFetching ? true : false;
    
    const handleAccountSelect = async (event, accountId) => {

        // prevent switch between accounts when user selects the edit / view buttons
        const svgSelected = event.target.parentElement.parentElement.id;
        const directSelected = event.target.id;
        if (svgSelected === 'floating-icons' || directSelected === 'floating-icons') {
            return;
        }

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
                        <AccountTotalCard accountData={accountData.data} />
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
                <AddModal 
                    addAccountState={addAccountState} 
                    handleAddAccount={handleAddAccount} 
                    setAddAccountState={setAddAccountState} 
                />

                {/* Warning Dialogue Card */}
                <WarningDialogueCard 
                    message={"Unable to delete, user must have At least one finance account on their profile"}
                    dialogueCardState={apiErrorDialogueBox}
                    setDialogueCardState={setApiErrorDialogueBox}
                />
                

                <Row gutter={20}>
                    {
                        accountData.data.map((account, index) => (
                            <Col key={index} lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                                <AccountCardSelect
                                    handleDelete={handleDelete}
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