import React from "react";
import styles from './largeCardWrapper.module.scss';

export const LargeCardWrapper = ({ children }) => {
    return (
        <div className={styles.largeCardWrapper}>
            {children}
        </div>
    );
}