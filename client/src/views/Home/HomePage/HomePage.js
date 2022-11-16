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

import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { unAuthorizedErrors } from "../../../utils/errorTypes";

const HomePage = () => {

    const [state, setState] = useState(SORT_DATE_BY.THIS_MONTH);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        data: authData,
        isUninitialized: authIsUninitiated,
        isLoading: authIsLoading,
        isError: isAuthError,
        error: authError
    } = userAuthApi.endpoints.verifyAuth.useQueryState();

    const [
        expenseApiTrigger,
        expenseApiResult
    ] = expenseApi.endpoints.getExpenses.useLazyQuery();

    const [
        incomeApiTrigger,
        incomeApiResult
    ] = incomeApi.endpoints.getIncomes.useLazyQuery();

    const [
        financeAccountApiTrigger,
        financeAccountApiResult
    ] = financeAccountApi.endpoints.getAccounts.useLazyQuery();

    // logout user if unauthorized
    if (
        financeAccountApiResult.error || 
        incomeApiResult.error || 
        expenseApiResult.error
    ) {
        if (
            unAuthorizedErrors.includes(expenseApiResult.error.data.message) ||
            unAuthorizedErrors.includes(incomeApiResult.error.data.message) ||
            unAuthorizedErrors.includes(financeAccountApiResult.error.data.message)
        ) {
            dispatch(
                userAuthApi.util.updateQueryData("verifyAuth", undefined, (draftPosts) => {
                    return draftPosts = {}
                })
            );
            navigate('/auth/login');
        }
    }

    useEffect(() => {
        expenseApiTrigger({ accountId: authData.defaultAccount, para: state.value });
        incomeApiTrigger({ accountId: authData.defaultAccount, para: state.value });


    }, [state]);

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
                        <AccountCard result={financeAccountApiResult} />
                    </Col>
                    <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <IncomeCard result={incomeApiResult} />
                    </Col>
                    <Col lg={8} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <ExpenseCard result={expenseApiResult} />
                    </Col>
                </Row>

                <br/>

                <Row gutter={20}>
                    <Col lg={12} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <ExpenseRecordCard result={expenseApiResult} dateSortByState={state.value} />                
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24} className={`${styles.col} gutter-row`}>
                        <IncomeRecordCard result={incomeApiResult} dateSortByState={state.value} />                
                    </Col>
                </Row>
            </div>
        </AppLayout>
    );
}

export default HomePage;