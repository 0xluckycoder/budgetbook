import React from 'react';
import styles from './topNavWrapper.module.scss';

export const TopNavWrapper = ({ children }) => {
    return <div className={styles.topNav}>{children}</div>
}