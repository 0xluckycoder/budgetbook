import React from "react";
import styles from './cardFooter.module.scss';

export const CardFooter = ({ children }) => {
    return (
        <div className={styles.cardFooter}>
            <p>Last Updated</p>
            <p>{children}</p>
        </div>
    )
}