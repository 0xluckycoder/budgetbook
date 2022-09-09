import React from "react";
import styles from './recordListItemWrapper.module.scss';

export const RecordListItemWrapper = ({ children }) => {
    return (
        <div className={styles.recordListItemWrapper}>
            {children}
        </div>
    );
}