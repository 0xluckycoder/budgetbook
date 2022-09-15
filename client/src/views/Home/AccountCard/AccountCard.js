import React from "react";
import styles from './accountCard.module.scss';

export const AccountCard = () => {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardHeading}>
                <p>Account</p>
            </div>

            <div className={styles.cardDetails}>
                <p className={styles.amount}>10000</p>
                <p className={styles.accountName}>Bank Account</p>
            </div>

            <div className={styles.footer}>
                <p>Last Updated</p>
                <p>2022 Sep 01</p>
            </div>
        </div>
    );
}