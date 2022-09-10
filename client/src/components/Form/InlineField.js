import React from "react";
import styles from './inlineField.module.scss';

export const InlineField = ({ children }) => {
    return (
        <div className={styles.inline}>
            {children}
        </div>
    )
}