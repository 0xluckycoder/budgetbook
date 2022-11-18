import React, { useContext } from "react";
import styles from './topNav.module.scss';
import Profile from '../../assets/TopNav/profile.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SideNavContext } from "../layout/AppLayout";
import { useNavigate } from "react-router-dom";

export const TopNav = ({ authData, hamburger }) => {

    const navigate = useNavigate();

    return (
        <div className={styles.topNav}>
            <div className={styles.left}>
                {hamburger && <HamburgerIcon />}
                <p className={styles.logo}>BudgetBook</p>
            </div>
            <div onClick={() => navigate('/app/settings')} className={styles.profileCard}>
                <img alt="profile" src={Profile} />
                <p className={styles.userName}>{authData.firstName}</p>
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