import React, { useState } from "react";
import styles from './appSettings.module.scss';
import { DownOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, Dropdown, Menu, Space, DatePicker } from 'antd';

export const AppSettings = () => {

    // const [input, setInput] = useState({
    //     language: null,
    //     defaultAccount: null,
    //     defaultPeriod: null
    // });

    const [form] = Form.useForm();

    const languageMenuData = [
        {
            label: <p>English</p>,
            key: '0'
        },
        {
            label: <p>Japanese</p>,
            key: '1'
        },
        {
            label: <p>French</p>,
            key: '2',
        }
    ];

    const languageMenu = <Menu items={languageMenuData} />

    return (
        <div className={styles.cardWrapper}>

            <h2 className={styles.heading}>App Settings</h2>

            <Form form={form} layout="vertical">
                <Form.Item label="Language">
                    <Dropdown overlay={languageMenu} trigger={['click']}>
                        <Space className='themed-dropdown'>
                            <p className='themed-dropdown'>Select</p>
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                </Form.Item>

                <Form.Item label="Default Account">
                    <Dropdown overlay={languageMenu} trigger={['click']}>
                        <Space className='themed-dropdown'>
                            <p className='themed-dropdown'>Select</p>
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                </Form.Item>

                <Form.Item label="Default Period">
                    <Dropdown overlay={languageMenu} trigger={['click']}>
                        <Space className='themed-dropdown'>
                            <p className='themed-dropdown'>Select</p>
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                </Form.Item>
            </Form>

        </div>
    );
}