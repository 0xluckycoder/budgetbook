import React from "react";
import styles from './navLeft.module.scss';
import { Logo } from "./Logo";
import { HamburgerIcon } from "./HamburgerIcon";

export const NavLeft = ({ hamburger }) => {
    return (
        <div className={styles.navLeft}>
            {hamburger && <HamburgerIcon />}
            <Logo />
        </div>
    );
}