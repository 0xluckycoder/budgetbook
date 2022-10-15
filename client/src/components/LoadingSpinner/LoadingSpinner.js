import React, { useState, useEffect } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styles from './loadingSpinner.module.scss';

export const LoadingSpinner = () => {
    return (
        <div className={styles.spinner}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
        </div>
    );
}