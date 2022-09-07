import React from "react";
import styles from './sideNavWrapper.module.scss';

export const SideNavWrapper = ({ children, isActive }) => {
    return (
        <div className={`${styles.sideNavWrapper} ${isActive ? styles.sideNavWrapperActive : null}`}>
            {children}
        </div>
    );
}