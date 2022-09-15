import React, { useState } from "react";
import { AppLayout } from "../../../components/layout/AppLayout";
import styles from './homePage.module.scss';
import { Col, Row } from 'antd';
import { DropdownButton } from "../../../components/DropdownButton/DropdownButton";

import { AccountCard } from "../AccountCard/AccountCard";
import { IncomeCard } from "../IncomeCard/IncomeCard";
import { ExpenseCard } from "../ExpenseCard/ExpenseCard";
import { ExpenseRecordCard } from "../ExpenseRecordCard/ExpenseRecordCard";
import { IncomeRecordCard } from "../IncomeRecordCard/IncomeRecordCard";

const HomePage = () => {

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
                        <IncomeCard />
                    </Col>
                    <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <ExpenseCard />
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

export default HomePage;