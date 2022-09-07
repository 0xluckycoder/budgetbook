import React from "react";
import styles from './hamburgerIcon.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export const HamburgerIcon = () => {
    return <FontAwesomeIcon className={styles.hamburger} icon={faBars} />
}