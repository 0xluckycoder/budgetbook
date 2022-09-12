import React from "react";
import { AppLayout } from "../AppLayout";
import { Col, Row } from 'antd';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { AccountTotalCard } from "../../containers/AccountTotalCard/AccountTotalCard";
import styles from './account.module.scss';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const Accounts = () => {
    return (
        <AppLayout>
            <h2 className={styles.heading}>Accounts</h2>
            <div className={styles.accounts}>
            <Row gutter={12}>
                {/* <AccountTotalCard /> */}
                    <Col lg={12} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <AccountTotalCard />
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        {/* <AccountTotalCard /> */}
                    </Col>
                    {/* <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}> */}
                        {/* <AccountTotalCard /> */}
                    {/* </Col> */}
                </Row>
                {/* <AccountTotalCard /> */}
            </div>
        </AppLayout>
    );
}

export default Accounts;