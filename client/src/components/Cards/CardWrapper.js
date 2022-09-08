import React from "react";
import styles from './cardWrapper.module.scss';

export const CardWrapper = ({ children }) => {
    return (
        <div className={styles.cardWrapper}>
            {children}
        </div>
    )
}