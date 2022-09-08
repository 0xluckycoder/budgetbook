import React from "react";
import styles from './accountCardDetails.module.scss';

export const AccountCardDetails = ({ amount, accountName }) => {
    return (
        <div className={styles.accountCardDetails}>
            <p className={styles.amount}>{amount}</p>
            <p className={styles.accountName}>{accountName}</p>
        </div>
    );
}