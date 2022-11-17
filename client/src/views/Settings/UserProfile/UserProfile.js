import React from "react";
import styles from './userProfile.module.scss';
import profilePlaceholder from './../../../assets/Settings/settings-user-placeholder.svg';
import { Button } from 'antd';

export const UserProfile = ({
    userData
}) => {
    return (
        <div className={styles.cardWrapper}>
            <h2 className={styles.heading}>User Profile</h2>
            {/* <img className={styles.image} src={profilePlaceholder} alt="user profile" /> */}
            <div className={styles.inline}>
                <p>{userData.firstName}</p>
                <p>{userData.lastName}</p>
            </div>
            <p className={styles.email}>{userData.email}</p>
        </div>
    );
}