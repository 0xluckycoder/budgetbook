import React from "react";
import styles from './expenseCard.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { CustomLineChart } from "./CustomLineChart";

const data = [
    {
    "Date": "2010-01",
    "scales": 1998
    },
    {
    "Date": "2010-02",
    "scales": 1850
    },
    {
    "Date": "2010-03",
    "scales": 1720
    },
    {
    "Date": "2010-04",
    "scales": 1818
    },
    {
    "Date": "2010-05",
    "scales": 1920
    },
    {
    "Date": "2010-06",
    "scales": 1802
    },
    {
    "Date": "2010-07",
    "scales": 1945
    },
    {
    "Date": "2010-08",
    "scales": 1856
    },
    {
    "Date": "2010-09",
    "scales": 2107
    },
    {
    "Date": "2010-10",
    "scales": 2140
    },
    {
    "Date": "2010-11",
    "scales": 2311
    },
    {
    "Date": "2010-12",
    "scales": 1972
    },
    {
    "Date": "2011-01",
    "scales": 1760
    },
    {
    "Date": "2011-02",
    "scales": 1824
    },
    {
    "Date": "2011-03",
    "scales": 1801
    },
    {
    "Date": "2011-04",
    "scales": 2001
    },
    {
    "Date": "2011-05",
    "scales": 1640
    },
    {
    "Date": "2011-06",
    "scales": 1502
    },
    {
    "Date": "2011-07",
    "scales": 1621
    },
    {
    "Date": "2011-08",
    "scales": 1480
    },
    {
    "Date": "2011-09",
    "scales": 1549
    },
    {
    "Date": "2011-10",
    "scales": 1390
    },
    {
    "Date": "2011-11",
    "scales": 1325
    },
    {
    "Date": "2011-12",
    "scales": 1250
    },
    {
    "Date": "2012-01",
    "scales": 1394
    },
    {
    "Date": "2012-02",
    "scales": 1406
    },
    {
    "Date": "2012-03",
    "scales": 1578
    },
    {
    "Date": "2012-04",
    "scales": 1465
    },
    {
    "Date": "2010-11",
    "scales": 2311
    },
    {
    "Date": "2010-12",
    "scales": 1972
    },
    {
    "Date": "2011-01",
    "scales": 1760
    },
    {
    "Date": "2011-02",
    "scales": 1824
    },
    {
    "Date": "2011-03",
    "scales": 1801
    },
    {
    "Date": "2011-04",
    "scales": 2001
    },
    {
    "Date": "2011-05",
    "scales": 1640
    },
    {
    "Date": "2011-06",
    "scales": 1502
    },
    {
    "Date": "2010-11",
    "scales": 2311
    },
    {
    "Date": "2010-12",
    "scales": 1972
    },
    {
    "Date": "2011-01",
    "scales": 1760
    },
    {
    "Date": "2011-02",
    "scales": 1824
    },
    {
    "Date": "2011-03",
    "scales": 1801
    },
    {
    "Date": "2011-04",
    "scales": 2001
    },
    {
    "Date": "2011-05",
    "scales": 1640
    },
    {
    "Date": "2011-06",
    "scales": 1502
    },
];

export const ExpenseCard = ({ amount, percentage }) => {
    return (
        <div className={styles.cardWrapper}>
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
            <CustomLineChart data={data} />
        </div>
    );
}