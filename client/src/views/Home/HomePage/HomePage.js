import React, { useEffect, useState } from "react";
import { AppLayout } from "../../../components/layout/AppLayout";
import styles from './homePage.module.scss';
import { Col, Row } from 'antd';
import { DropdownButton } from "../../../components/DropdownButton/DropdownButton";

import { AccountCard } from "../AccountCard/AccountCard";
import { IncomeCard } from "../IncomeCard/IncomeCard";
import { ExpenseCard } from "../ExpenseCard/ExpenseCard";
import { ExpenseRecordCard } from "../ExpenseRecordCard/ExpenseRecordCard";
import { IncomeRecordCard } from "../IncomeRecordCard/IncomeRecordCard";

import { useGetExpensesQuery, expenseApi } from "../../../store/expense/expense.slice";
import { useGetIncomesQuery, incomeApi } from "../../../store/income/income.slice";
import { useGetUserAttributesQuery, userAuthApi } from "../../../store/user/user.slice";
import { useGetAccountsQuery, financeAccountApi } from "../../../store/financeAccount/financeAccount.slice";

import { SORT_DATE_BY } from "../../../utils/constants";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const HomePage = () => {

    const [state, setState] = useState(SORT_DATE_BY.THIS_MONTH);

    const {
        data: authData,
        isUninitialized: authIsUninitiated,
        isLoading: authIsLoading
    } = userAuthApi.endpoints.verifyAuth.useQueryState();

    const [
        expenseApiTrigger,
        expenseApiResult,
        expenseApiLastPromiseInfo
    ] = expenseApi.endpoints.getExpenses.useLazyQuery();

    const [
        incomeApiTrigger,
        incomeApiResult,
        incomeApiLastPromiseInfo
    ] = expenseApi.endpoints.getExpenses.useLazyQuery();

    const [
        financeAccountApiTrigger,
        financeAccountApiResult,
        financeAccountApiLastPromiseInfo
    ] = financeAccountApi.endpoints.getAccounts.useLazyQuery();

    useEffect(() => {
        if (authData && !authIsUninitiated) {
            // don't trigger data if already have it
            expenseApiTrigger({ accountId: authData.defaultAccount, para: 'thismonth' });
            incomeApiTrigger({ accountId: authData.defaultAccount, para: 'thismonth' });
            financeAccountApiTrigger();
        }
    }, [authData]);

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
    return (
        <AppLayout>
            {/* <h1>Testing</h1> */}
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
                        {/* <IncomeCard dateSortByState={state.value} /> */}
                    </Col>
                    <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        {/* <ExpenseCard dateSortByState={state.value} /> */}
                    </Col>
                </Row>

                <br/>

                <Row gutter={20}>
                    <Col lg={12} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <ExpenseRecordCard result={incomeApiResult} dateSortByState={state.value} />                
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        {/* <IncomeRecordCard result={incomeApiResult} dateSortByState={state.value} />                 */}
                    </Col>
                </Row>
            </div>
        </AppLayout>
    );
}

export default HomePage;