import React from "react";
import styles from './recordListItemLeft.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';

export const RecordListItemLeft = ({ name, percentage }) => {
    return (
        <div className={styles.recordListItemLeft}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faBarsStaggered} />
            </div>
            <p className={styles.name}>{name}</p>
            <p>{percentage}</p>
        </div>
    );
}