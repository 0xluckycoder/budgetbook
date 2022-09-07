import React from "react";
import styles from './sideNavWrapper.module.scss';

export const SideNavWrapper = ({ children }) => {
    return (
        <div className={styles.sideNav}>
            {children}
        </div>
    );
}

