import React, { useState } from "react";
import { AppLayout } from "../AppLayout";
import { Col, Row } from 'antd';
import styles from './home.module.scss';
import { DropdownButton } from "../../containers/DropdownButton/DropdownButton";

import { AccountCard } from "../../containers/AccountCard/AccountCard";
import { IncomeCard } from "../../containers/IncomeCard/IncomeCard";
import { ExpenseCard } from "../../containers/ExpenseCard/ExpenseCard";
import { ExpenseRecordCard } from "../../containers/ExpenseRecordsCard/ExpenseRecordCard";
import { IncomeRecordCard } from "../../containers/IncomeRecordsCard/IncomeRecordCard";

const Home = () => {

    const [state, setState] = useState('Yearly');

    const values = [
        {
            value: 'Yearly'
        },
        {
            value: 'Daily'
        },
        {
            value: 'Max'
        }
    ];

    return (
        <AppLayout>
            <h2 className={styles.heading}>Dashboard</h2>
            <div className={styles.home}>

            <div className={styles.dropdown}>
                <DropdownButton
                    state={state} 
                    setState={setState} 
                    dropdownValues={values} 
                />
            </div>
                                    
            <Row gutter={20}>
                <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                    <AccountCard />
                </Col>
                <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                    <div className={styles.box}>
                        <IncomeCard />
                    </div>
                </Col>
                <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                    <div className={styles.box}>
                        <ExpenseCard />
                    </div>
                </Col>
            </Row>

            <br/>

            <Row gutter={20}>
                <Col lg={12} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                    <ExpenseRecordCard />                
                </Col>
                <Col lg={12} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                    <IncomeRecordCard />                
                </Col>
            </Row>

            </div>
        </AppLayout>
    );
}

export default Home;