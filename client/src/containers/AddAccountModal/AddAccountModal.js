import React, { useState } from 'react';
import { Modal, Form, Input, Dropdown, Button, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { InlineField } from '../../components/Form/InlineField';

export const AddAccountModal = ({ addAccountState, setAddAccountState }) => {


    const { TextArea } = Input;

    const [form] = Form.useForm();
    const [currencyDropdownState, setCurrencyDropdownState] = useState('Select Currency');

    const currencyMenuData = [
        {
            label: <p onClick={() => setCurrencyDropdownState('US Dollar')}>US Dollar</p>,
            key: '0'
        },
        {
            label: <p onClick={() => setCurrencyDropdownState('LKR')}>LKR</p>,
            key: '1'
        },
        {
            label: <p onClick={() => setCurrencyDropdownState('GBP')}>GBP</p>,
            key: '2',
        }
    ];

    const currencyMenu = <Menu items={currencyMenuData} />

    return (
        <Modal
            title="New Account"
            centered
            open={addAccountState}
            onCancel={() => setAddAccountState(false)}
            className="form-modal"
            footer={[
            <div>
                <Button className="themed-button" onClick={() => setAddAccountState(false)}>
                    Save
                </Button>
                <Button className="themed-button" onClick={() => setAddAccountState(false)}>
                    Close
                </Button>
            </div>
            ]}
        >
            <Form form={form} layout="vertical">
                <InlineField>
                    <Form.Item label="Account Name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Amount">
                        <Dropdown overlay={currencyMenu} trigger={['click']}>
                            <Space className='themed-dropdown'>
                                <p className='themed-dropdown'>{currencyDropdownState}</p>
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </Form.Item>
                </InlineField>
                
                <Form.Item label="Initial Account Value">
                    <Input />
                </Form.Item>

                <Form.Item label="Account Description">
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
}