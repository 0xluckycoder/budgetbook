import React from "react";
import styles from './profileCard.module.scss';
import Profile from '../../assets/TopNav/profile.svg';

export const ProfileCard = ({ userName }) => {
    return (
        <div className={styles.accountCard}>
            <img src={Profile} />
            <p className={styles.userName}>{userName}</p>
        </div>
    );
}