import React from "react";
import styles from './incomeCard.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { CustomLineChart } from "./CustomLineChart";

const exampleData = [
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

const data = [
    {
        "Date": "2022-09-1",
        "scales": 200
    },
    {
        "Date": "2022-09-2",
        "scales": 300
    },
    {
        "Date": "2022-09-3",
        "scales": 130
    },
    {
        "Date": "2022-09-4",
        "scales": 540
    },
    {
        "Date": "2022-09-5",
        "scales": 10
    },
    {
        "Date": "2022-09-6",
        "scales": 276
    },
    {
        "Date": "2022-09-7",
        "scales": 453
    },
    {
        "Date": "2022-09-8",
        "scales": 183
    },
    {
        "Date": "2022-09-9",
        "scales": 220
    },
    {
        "Date": "2022-09-10",
        "scales": 409
    },
    {
        "Date": "2022-09-11",
        "scales": 200
    },
    {
        "Date": "2022-09-12",
        "scales": 300
    },
    {
        "Date": "2022-09-13",
        "scales": 130
    },
    {
        "Date": "2022-09-14",
        "scales": 540
    },
    {
        "Date": "2022-09-15",
        "scales": 10
    },
    {
        "Date": "2022-09-16",
        "scales": 276
    },
    {
        "Date": "2022-09-17",
        "scales": 453
    },
    {
        "Date": "2022-09-18",
        "scales": 183
    },
    {
        "Date": "2022-09-19",
        "scales": 220
    },
    {
        "Date": "2022-09-20",
        "scales": 409
    },
    {
        "Date": "2022-09-21",
        "scales": 200
    },
    {
        "Date": "2022-09-22",
        "scales": 300
    },
    {
        "Date": "2022-09-23",
        "scales": 130
    },
    {
        "Date": "2022-09-24",
        "scales": 540
    },
    {
        "Date": "2022-09-25",
        "scales": 10
    },
    {
        "Date": "2022-09-26",
        "scales": 276
    },
    {
        "Date": "2022-09-27",
        "scales": 453
    },
    {
        "Date": "2022-09-28",
        "scales": 183
    },
    {
        "Date": "2022-09-29",
        "scales": 220
    },
    {
        "Date": "2022-09-30",
        "scales": 409
    },
    {
        "Date": "2022-10-1",
        "scales": 200
    },
    {
        "Date": "2022-10-2",
        "scales": 300
    },
    {
        "Date": "2022-10-3",
        "scales": 130
    },
    {
        "Date": "2022-10-4",
        "scales": 540
    },
    {
        "Date": "2022-10-5",
        "scales": 10
    },
    {
        "Date": "2022-10-6",
        "scales": 276
    },
    {
        "Date": "2022-10-7",
        "scales": 453
    },
    {
        "Date": "2022-10-8",
        "scales": 183
    },
    {
        "Date": "2022-10-9",
        "scales": 220
    },
    {
        "Date": "2022-10-10",
        "scales": 409
    },
    {
        "Date": "2022-10-11",
        "scales": 200
    },
    {
        "Date": "2022-10-12",
        "scales": 300
    },
    {
        "Date": "2022-10-13",
        "scales": 130
    },
    {
        "Date": "2022-10-14",
        "scales": 540
    },
    {
        "Date": "2022-10-15",
        "scales": 10
    },
    {
        "Date": "2022-10-16",
        "scales": 276
    },
    {
        "Date": "2022-10-17",
        "scales": 453
    },
    {
        "Date": "2022-10-18",
        "scales": 183
    },
    {
        "Date": "2022-10-19",
        "scales": 220
    },
    {
        "Date": "2022-10-20",
        "scales": 409
    },
    {
        "Date": "2022-10-21",
        "scales": 200
    },
    {
        "Date": "2022-10-22",
        "scales": 300
    },
    {
        "Date": "2022-10-23",
        "scales": 130
    },
    {
        "Date": "2022-10-24",
        "scales": 540
    },
    {
        "Date": "2022-10-25",
        "scales": 10
    },
    {
        "Date": "2022-10-26",
        "scales": 276
    },
    {
        "Date": "2022-10-27",
        "scales": 453
    },
    {
        "Date": "2022-10-28",
        "scales": 183
    },
    {
        "Date": "2022-10-29",
        "scales": 220
    },
    {
        "Date": "2022-10-30",
        "scales": 409
    },
]

export const IncomeCard = ({ amount, percentage }) => {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardHeading}>
                <p>Incomes</p>
            </div>
            <div className={styles.cardDetails}>
                <p className={styles.amount}>5000</p>
                <div className={`${styles.percentage} ${styles.green}`}>
                    <p>15%</p>
                    <FontAwesomeIcon className={styles.redCarrot} icon={faCaretUp} />
                </div>
            </div>
            <CustomLineChart data={data} />
        </div>
    );
}