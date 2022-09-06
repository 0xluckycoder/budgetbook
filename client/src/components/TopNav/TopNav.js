import React from 'react';
import styles from './topNav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export const TopNav = ({ hamburger }) => {
    return (
        <div className={styles.topNav}>
            {hamburger && <FontAwesomeIcon onClick={() => console.log('clicked')} icon={faBars} />}
            <h1>BudgetBook</h1>
        </div>
    );
}