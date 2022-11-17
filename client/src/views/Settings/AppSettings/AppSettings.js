import React, { useState } from "react";
import styles from './appSettings.module.scss';
import { DownOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, Dropdown, Menu, Space, DatePicker } from 'antd';

export const AppSettings = ({
    userData
}) => {

    return (
        <div className={styles.cardWrapper}>

            <h2 className={styles.heading}>App Settings</h2>

            <div className={styles.cardInner}>
                <div className={styles.item}>
                    <p className={styles.label}>Language</p>
                    <p className={styles.text}>{userData.language}</p>
                </div>

                <div className={styles.item}>
                    <p className={styles.label}>Default Date Range</p>
                    <p className={styles.text}>{userData.defaultSortPeriod}</p>
                </div>
            </div>

            <Button className="themed-button">
                Edit
            </Button>

        </div>
    );
}