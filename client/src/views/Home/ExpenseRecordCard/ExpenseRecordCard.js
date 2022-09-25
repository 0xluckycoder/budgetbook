import React, { useState } from 'react';
import { Button, Modal, Form, Input, Dropdown, Menu, Space, DatePicker } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import imagePlaceholder from '../../../assets/Modal/add-photos-placeholder.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { InlineField } from '../../../components/Form/InlineField';
import { useSelector, useDispatch } from 'react-redux';
import { addRecord, selectExpense } from '../../../store/expense/expense.slice';
import styles from './expenseRecordCard.module.scss';

export const ExpenseRecordCard = () => {

    const expense = useSelector(selectExpense);
    const dispatch = useDispatch();
    
    const { TextArea } = Input;

    const [addModalState, setAddModalState] = useState(false);
    const [form] = Form.useForm();
    const [accountDropdownState, setAccountDropdownState] = useState('Select Account');
    const [categoryDropdownState, setCategoryDropdownState] = useState('Select Category');

    const [inputState, setInputState] = useState({});

    const handleInputChange = (e) => {
        setInputState({...inputState, [e.target.name]: e.target.value});
    }

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
            label: <p onClick={() => setAccountDropdownState('Investment')}>Investment</p>,
            key: '2',
        }
    ];

    const categoryMenuData = [
        {
            key: '0',
            label: <p onClick={() => setCategoryDropdownState('Food')}>Food</p>
        },
        {
            key: '1',
            label: <p onClick={() => setCategoryDropdownState('Travel')}>Travel</p>
        },
        {
            key: '2',
            label: <p onClick={() => setCategoryDropdownState('Other')}>Other</p>
        }
    ];

    const accountMenu = <Menu items={accountMenuData} />;

    const categoryMenu = <Menu items={categoryMenuData} />;

    const handleSubmit = () => {
        const uploadFormData = {
            ...inputState,
            account: accountDropdownState,
            category: categoryDropdownState
        }

        console.log(uploadFormData);
        dispatch(addRecord(uploadFormData));
        setAddModalState(false);
    }

    const handleClose = () => {

    }

    return (
        <div className={styles.recordCardWrapper}>
            <div className={styles.cardHeading}>
                <p>Expense Record</p>
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
                  <Button className="themed-button" onClick={() => handleSubmit()}>
                    Save
                  </Button>
                ]}
            >
                <Form form={form} layout="vertical">
                    <InlineField>
                        <Form.Item label="Title">
                            <Input value={inputState.name} name="title" onChange={handleInputChange} />
                        </Form.Item>
                        <Form.Item label="Amount">
                            <Input value={inputState.amount} name="amount" onChange={handleInputChange} />
                        </Form.Item>
                    </InlineField>

                    <InlineField>
                        <Form.Item label="Account">
                            <Dropdown overlay={accountMenu} trigger={['click']} name="account" value={inputState.account} onChange={handleInputChange}>
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
                            <DatePicker onChange={(date, dateString) => setInputState({...inputState, transactionDate: dateString})} />
                        </Space>
                    </Form.Item>

                    <Form.Item label="Comment">
                        <TextArea name="comment" value={inputState.comment} onChange={handleInputChange} rows={4} />
                    </Form.Item>

                    <Form.Item label="Add Photos">
                        <div>
                            <img src={imagePlaceholder} alt="placeholder" />
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
            
            <RecordListWrapper>
                {expense.map(item => (
                    <RecordListItem title={item.title} percentage={item.percentage} amount={item.amount} />
                ))}
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

const RecordListItem = ({ title, percentage, amount }) => {
    return (
        <div className={styles.recordListItem}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faBarsStaggered} />
            </div>

            <p className={styles.name}>{title}</p>
            
            <p>{percentage}</p>

            <p className={styles.amount}>{amount}</p>

            <div className={styles.closeWrapper}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    );
}