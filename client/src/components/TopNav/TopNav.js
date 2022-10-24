import React, { useContext } from "react";
import styles from './topNav.module.scss';
import Profile from '../../assets/TopNav/profile.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SideNavContext } from "../layout/AppLayout";

export const TopNav = ({ userName, hamburger }) => {
    return (
        <div className={styles.topNav}>
            <div className={styles.left}>
                {hamburger && <HamburgerIcon />}
                <p className={styles.logo}>BudgetBook</p>
            </div>
            <div className={styles.profileCard}>
                <img alt="profile" src={Profile} />
                <p className={styles.userName}>{userName}</p>
            </div>
        </div>
    );
}

const HamburgerIcon = () => {
    const { active, setActive } = useContext(SideNavContext);
    return (
        <div onClick={() => setActive(active => !active)}>
            <FontAwesomeIcon className={styles.hamburger} icon={faBars} />
        </div>
    );
}