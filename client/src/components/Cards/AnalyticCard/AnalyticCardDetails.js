import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import styles from './analyticCardDetails.module.scss';

export const AnalyticCardDetails = ({ amount, percentage }) => {
    return (
        <div className={styles.analyticCardDetails}>
            <p className={styles.amount}>5000</p>
            <div className={`${styles.percentage} ${styles.green}`}>
                <p>15%</p>
                <FontAwesomeIcon className={styles.redCarrot} icon={faCaretUp} />
            </div>
        </div>
    )
}