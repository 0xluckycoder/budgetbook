import React from "react";
import styles from './recordListItemAmount.module.scss';

export const RecordListItemAmount = ({ children }) => {
    return <p className={styles.amount}>{children}</p>
}