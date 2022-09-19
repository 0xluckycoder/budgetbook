import React from "react";
import styles from './userProfile.module.scss';
import profilePlaceholder from './../../../assets/Settings/settings-user-placeholder.svg';
import { Button } from 'antd';

export const UserProfile = () => {
    return (
        <div className={styles.cardWrapper}>
            <h2 className={styles.heading}>User Profile</h2>
            <img className={styles.image} src={profilePlaceholder} alt="user profile" />
            <p className={styles.name}>Johnathan Doe</p>
            <p className={styles.email}>johndoe@email.com</p>
            <Button className="themed-button">
                Edit
            </Button>
        </div>
    );
}