import React, { useState } from "react";
import { AppLayout } from "../../../components/layout/AppLayout";
import { Col, Row, Button } from 'antd';
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

const AccountPage = () => {

    const [addAccountState, setAddAccountState] = useState(false);

    const {
        data: accountData,
        isLoading,
        isFetching
    } = useGetAccountsQuery();

    const [addAccount] = useAddAccountMutation();

    // send account add request
    const handleAddAccount = async (data) => {
        try {
            await addAccount(data).unwrap();
        } catch(error) {
            console.log(error);
        }
    }

    let isContentLoading = isLoading && isFetching ? true : false;

    return (
        <AppLayout>
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
                >Add Account</Button>

                <AddAccountModal handleAddAccount={handleAddAccount} addAccountState={addAccountState} setAddAccountState={setAddAccountState} />

                <Row gutter={20}>
                {
                    isContentLoading 
                    ?
                    <LoadingSpinner />
                    :
                    accountData.data.map((account, index) => (
                        <Col key={index} lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                            <AccountCardSelect accountName={account.name} amount={account.value} />
                        </Col>
                    ))
                }
                </Row>
            </div>
        </AppLayout>
    );
}

export default AccountPage;