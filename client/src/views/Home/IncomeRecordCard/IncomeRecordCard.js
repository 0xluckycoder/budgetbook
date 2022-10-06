import React, { useState } from 'react';
import { Button, Modal, Form, Input, Dropdown, Menu, Space, DatePicker } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import imagePlaceholder from '../../../assets/Modal/add-photos-placeholder.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';

import { InlineField } from '../../../components/Form/InlineField';

import styles from './incomeRecordCard.module.scss';

export const IncomeRecordCard = () => {
    const { TextArea } = Input;

    const [addModalState, setAddModalState] = useState(false);
    const [form] = Form.useForm();
    const [accountDropdownState, setAccountDropdownState] = useState('Select Account');
    const [categoryDropdownState, setCategoryDropdownState] = useState('Select Category');

    const accountMenuData = [
        {
            label: <p onClick={() => setAccountDropdownState('Bank')}>Bank</p>,
            key: '0'
        },
        {
            label: <p onClick={() => setAccountDropdownState('Personal')}>Personal</p>,
            key: '1'
        },
        {
            label: <p onClick={() => setAccountDropdownState('Investment')}>Personal</p>,
            key: '2',
        }
    ];

    const categoryMenuData = [
        {
            key: '1',
            label: <p onClick={() => setCategoryDropdownState('Category 1')}>Food</p>
        },
        {
            key: '2',
            label: <p onClick={() => setCategoryDropdownState('Category 2')}>Personal</p>
        },
        {
            key: '2',
            label: <p onClick={() => setCategoryDropdownState('Category 3')}>Personal</p>
        }
    ];

    const accountMenu = <Menu items={accountMenuData} />

    const categoryMenu = <Menu items={categoryMenuData} />

    return (
        <div className={styles.recordCardWrapper}>
            <div className={styles.cardHeading}>
                <p>Income Record</p>
            </div>

            <Button className="themed-button" type="primary" onClick={() => setAddModalState(true)}>
                Add
            </Button>

            {/* add expense modal */}
            <Modal
                title="New Expense"
                centered
                open={addModalState}
                onCancel={() => setAddModalState(false)}
                className="form-modal"
                footer={[
                  <Button className="themed-button" onClick={() => setAddModalState(false)}>
                    Save
                  </Button>
                ]}
            >
                <Form form={form} layout="vertical">
                    <InlineField>
                        <Form.Item label="Name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Amount">
                            <Input />
                        </Form.Item>
                    </InlineField>

                    <InlineField>
                        <Form.Item label="Account">
                            <Dropdown overlay={accountMenu} trigger={['click']}>
                                <Space className='themed-dropdown'>
                                    <p className='themed-dropdown'>{accountDropdownState}</p>
                                    <DownOutlined />
                                </Space>
                            </Dropdown>
                        </Form.Item>
                        <Form.Item label="Category">
                            <Dropdown overlay={categoryMenu} trigger={['click']}>
                                <Space className='themed-dropdown'>
                                    <p>{categoryDropdownState}</p>
                                    <DownOutlined />
                                </Space>
                            </Dropdown>
                        </Form.Item>
                    </InlineField>

                    <Form.Item label="Transaction Date">
                        <Space direction="vertical">
                            <DatePicker onChange={() => console.log('hello')}/>
                        </Space>
                    </Form.Item>

                    <Form.Item label="Comment">
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item label="Add Photos">
                        <div>
                            <img src={imagePlaceholder} alt="placeholder" />
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
            
            <RecordListWrapper>
                <RecordListItem />
                <RecordListItem />
                <RecordListItem />
                <RecordListItem />
                <RecordListItem />
                <RecordListItem />
                <RecordListItem />
            </RecordListWrapper>
        </div>
    );
}

const RecordListWrapper = ({ children }) => {
    return (
        <div className={styles.listScrollArea}>
            <div className={styles.recordListWrapper}>
                {children}
            </div>
        </div>
    );
}

const RecordListItem = () => {
    return (
        <div className={styles.recordListItem}>
            <RecordListItemLeft name="Food" percentage="30%" />
            <RecordListItemAmount>200</RecordListItemAmount>
            <RecordListItemRight />
        </div>
    );
}

const RecordListItemLeft = ({ name, percentage }) => {
    return (
        <div className={styles.recordListItemLeft}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faBarsStaggered} />
            </div>
            <p className={styles.name}>{name}</p>
            <p>{percentage}</p>
        </div>
    );
}

const RecordListItemAmount = ({ children }) => {
    return <p className={styles.amount}>{children}</p>
}


const RecordListItemRight = () => {
    return (
        <div className={styles.closeWrapper}>
            <FontAwesomeIcon icon={faXmark} />
        </div>
    );
}