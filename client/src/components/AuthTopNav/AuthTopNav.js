import React from "react";
import styles from './authTopNav.module.scss';

export const AuthTopNav = () => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.logo}>BudgetBook</p>
        </div>
    );
}