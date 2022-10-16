import React from "react";
import styles from './incomeCard.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { CustomLineChart } from "../../../components/CustomLineChart/CustomLineChart";
import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";
import { incomeApi } from "../../../store/income/income.slice";

export const IncomeCard = ({ dateSortByState }) => {

    const {
        data,
        isError,
        isFetching,
        isLoading,
        isSuccess
    } = incomeApi.endpoints.getIncomes.useQueryState(dateSortByState);

    let isContentLoading = isLoading && isFetching ? true : false;

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
                <p className={styles.amount}>5000</p>
                <div className={`${styles.percentage} ${styles.red}`}>
                    <p>15%</p>
                    <FontAwesomeIcon className={styles.redCarrot} icon={faCaretUp} />
                </div>
            </div>
            <CustomLineChart isContentLoading={isContentLoading} data={data} />
            </>
        }
    </div>
    );
}