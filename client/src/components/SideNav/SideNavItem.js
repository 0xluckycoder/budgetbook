import React from "react";
import styles from './sideNavItem.module.scss';

export const SideNavItem = ({ icon, name }) => {
    return (
        <div className={styles.sideNavItem}>
            <img src={icon} />
            <p>{name}</p>
        </div>
    )
}