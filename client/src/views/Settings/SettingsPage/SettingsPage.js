import React, { useState } from "react";
import { AppLayout } from "../../../components/layout/AppLayout";
import { UserProfile } from '../UserProfile/UserProfile';
import { AppSettings } from '../AppSettings/AppSettings';
import { Button } from 'antd';
import styles from './settingsPage.module.scss';


const SettingsPage = () => {
    return (
        <AppLayout>
            <h2 className={styles.heading}>Settings</h2>
            <div className={styles.settings}>
                <UserProfile />
                <Button className={`red-button ${styles.button}`}>Logout</Button>
                <AppSettings />
            </div>
        </AppLayout>
    );
}

export default SettingsPage;