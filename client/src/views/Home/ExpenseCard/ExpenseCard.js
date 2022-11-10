import React, { useEffect } from "react";
import styles from './expenseCard.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { CustomLineChart } from "../../../components/CustomLineChart/CustomLineChart";
import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";
import { useGetExpensesQuery, expenseApi } from "../../../store/expense/expense.slice";
import { userAuthApi } from "../../../store/user/user.slice";

export const ExpenseCard = ({ result }) => {

    let isContentLoading = result.isLoading && result.isFetching && result.isUninitialized;
    
    return (
        <div className={styles.cardWrapper}>
            {
                isContentLoading
                ? 
                <LoadingSpinner />
                :
                <>
                    <div className={styles.cardHeading}>
                        <p>Expenses</p>
                    </div>
                    <div className={styles.cardDetails}>
                        <p className={styles.amount}>5000</p>
                        <div className={`${styles.percentage} ${styles.red}`}>
                            <p>15%</p>
                            <FontAwesomeIcon className={styles.redCarrot} icon={faCaretDown} />
                        </div>
                    </div>
                    <CustomLineChart isContentLoading={isContentLoading} data={result} />
                </>
            }
        </div>
    );
}