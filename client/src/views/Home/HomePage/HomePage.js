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

import { useGetExpenseQuery } from "../../../store/expense/expense.slice";

import { SORT_DATE_BY } from "../../../utils/constants";

const HomePage = () => {

    const [state, setState] = useState(SORT_DATE_BY.THIS_MONTH);

    const { 
        data: returned 
    } = useGetExpenseQuery(state.value);
    console.log('fetched', returned);

    const values = [
        {
            value: SORT_DATE_BY.SEVEN_DAYS
        },
        {
            value: SORT_DATE_BY.THIS_MONTH
        },
        {
            value: SORT_DATE_BY.LAST_MONTH
        },
        {
            value: SORT_DATE_BY.THIS_YEAR
        },
        {
            value: SORT_DATE_BY.LAST_YEAR
        }
    ];

    const handleDropdownChange = async (data) => {
        // send as a parameter and trigger query
        setState(data);
    }

    const constantToReadable = () => {}
    
    return (
        <AppLayout>
            <h2 className={styles.heading}>Dashboard</h2>
            <div className={styles.home}>
                <div className={styles.dropdown}>
                    <DropdownButton
                        state={state.text}
                        handleDropdownChange={handleDropdownChange}
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
                        <ExpenseRecordCard dateSortByState={state.value} />                
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