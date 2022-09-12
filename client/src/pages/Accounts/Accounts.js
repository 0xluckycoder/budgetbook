import React from "react";
import { AppLayout } from "../AppLayout";
import { Col, Row } from 'antd';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { AccountTotalCard } from "../../containers/AccountTotalCard/AccountTotalCard";
// import { AccountCard } from "../../containers/AccountCard/AccountCard";
import { AccountCardSelect } from "../../containers/AccountCardSelect/AccountCardSelect";
import styles from './account.module.scss';

const Accounts = () => {
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

                <Row gutter={20}>
                    <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <AccountCardSelect />
                    </Col>
                    <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <AccountCardSelect />
                    </Col>
                    <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <AccountCardSelect />
                    </Col>
                </Row>

            </div>
        </AppLayout>
    );
}

export default Accounts;