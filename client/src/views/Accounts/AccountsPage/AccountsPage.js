import React, { useState } from "react";
import { AppLayout } from "../../../components/layout/AppLayout";
import { Col, Row, Button } from 'antd';
import { AccountTotalCard } from "../AccountTotalCard/AccountTotalCard";
import { AddAccountModal } from "../AddAccountModal/AddAccountModal";
import { AccountCardSelect } from "../AccountCardSelect/AccountCardSelect";
import styles from './accountPage.module.scss'

const AccountPage = () => {

    const [addAccountState, setAddAccountState] = useState(false);

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

                <AddAccountModal addAccountState={addAccountState} setAddAccountState={setAddAccountState} />

                <Row gutter={20}>
                    <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <AccountCardSelect accountName={"Personal"} amount={10000} />
                    </Col>
                    <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <AccountCardSelect accountName={"Bank"} amount={30000} />
                    </Col>
                    <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <AccountCardSelect accountName={"Investment"} amount={20000} />
                    </Col>
                </Row>
            </div>
        </AppLayout>
    );
}

export default AccountPage;