import React, { useState } from 'react';
import { Button, Modal, Form, Input, Dropdown, Menu, Space, DatePicker } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import imagePlaceholder from '../../assets/Modal/add-photos-placeholder.svg';

import { CardHeading } from '../../components/Cards/CardHeading';
import { RecordListItem } from '../../components/Cards/RecordCard/RecordListItem';
import { RecordCardWrapper } from '../../components/Cards/RecordCard/RecordCardWrapper';
import { RecordListWrapper } from '../../components/Cards/RecordCard/RecordListWrapper';
import { InlineField } from '../../components/Form/InlineField';

export const ExpenseRecordCard = () => {

    const { TextArea } = Input;

    const [addModalState, setAddModalState] = useState(false);
    const [form] = Form.useForm();
    const [accountDropdownState, setAccountDropdownState] = useState('Select Account');
    const [categoryDropdownState, setCategoryDropdownState] = useState('Select Category')

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
        <RecordCardWrapper>
            <CardHeading>
                Expense Records
            </CardHeading>

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
                        <img src={imagePlaceholder} />
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
        </RecordCardWrapper>
    );
}