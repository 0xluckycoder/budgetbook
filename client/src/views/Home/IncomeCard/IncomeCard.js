import React, { useState, useEffect } from "react";
import styles from './incomeCard.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { CustomLineChart } from "../../../components/CustomLineChart/CustomLineChart";
import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";
import { incomeApi } from "../../../store/income/income.slice";

export const IncomeCard = ({ result }) => {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (result.data) {
            let initial = 0;
            result.data.forEach(item => initial += parseInt(item.amount));
            setTotal(initial);
        }
    }, [result]);

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
                    <p>Incomes</p>
                </div>
                <div className={styles.cardDetails}>
                    <p className={styles.amount}>{total}</p>
                    <div className={`${styles.percentage} ${styles.red}`}>
                        <p>15%</p>
                        <FontAwesomeIcon className={styles.redCarrot} icon={faCaretUp} />
                    </div>
                </div>
                <CustomLineChart isContentLoading={isContentLoading} data={result} />
            </>
        }
    </div>
    );
}