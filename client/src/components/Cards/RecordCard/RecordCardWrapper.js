import React from "react";
import styles from './recordCardWrapper.module.scss';

export const RecordCardWrapper = ({ children }) => {
    return (
        <div className={styles.recordCardWrapper}>
            {children}
        </div>
    );
}