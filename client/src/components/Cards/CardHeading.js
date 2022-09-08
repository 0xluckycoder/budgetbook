import React from "react";
import styles from './cardHeading.module.scss';

export const CardHeading = ({ children }) => {
    return (
        <div className={styles.cardHeading}>
            <p>{children}</p>
        </div>
    );
}