import React, { useState } from "react";
import { Modal, Form, Input, Dropdown, Button, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { InlineField } from "../../../../components/Form/InlineField";
import { validateRequired, validateMax, validateMin } from '../../../../utils/formValidation';
import { financeAccountApi, useAddAccountMutation } from '../../../../store/financeAccount/financeAccount.slice';
import { ErrorBar } from "recharts";

export const AddModal = ({ 
    addAccountState, 
    setAddAccountState,
    handleAddAccount
}) => {

    const [inputState, setInputState] = useState({});
    const [error, setError] = useState({
        name: null,
        currencyType: null,
        value: null,
        description: null
    });

    const handleInputChange = (e) => {
        setInputState({...inputState, [e.target.name]: e.target.value});
    }

    const { TextArea } = Input;
    const [form] = Form.useForm();

    const currencyMenuData = [
        {
            label: <p key={0} onClick={() => setInputState({...inputState, currencyType: 'USD'})}>US Dollar</p>,
            key: '0'
        },
        {
            label: <p key={1} onClick={() => setInputState({...inputState, currencyType: 'LKR'})}>LKR</p>,
            key: '1'
        },
        {
            label: <p key={2} onClick={() => setInputState({...inputState, currencyType: 'GBP'})}>GBP</p>,
            key: '2',
        }
    ];

    const currencyDropdownText = inputState.currencyType === undefined ? 'Select Currency' : inputState.currencyType;

    const currencyMenu = <Menu onBlur={(e) => validate(inputState.currencyType, 'currencyType')} items={currencyMenuData} />;

    const validate = (value, field) => {
        if (field === 'name') {
            const validatedRequired = validateRequired(value);
            if (validatedRequired.error) {
                setError(error => ({...error, [field]: { validateStatus: "error", help: "This field is required" }}));
                return;
            } else {
                setError(error => ({...error, [field]: null}));
            }

            const validatedMin = validateMin(1, value);
            if (validatedMin.error)  {
                setError({...error, [field]: { validateStatus: "error", help: "add more characters" }});
                return;
            } else {
                setError({...error, [field]: null});
            }

            const validatedMax = validateMax(15, value);
            if (validatedMax.error)  {
                setError({...error, [field]: { validateStatus: "error", help: "Too long" }});
                return;
            } else {
                setError({...error, [field]: null});
            }
        }

        if (field === 'currencyType') {
            const validatedRequired = validateRequired(value);
            if (validatedRequired.error) {
                setError(error => ({...error, [field]: { validateStatus: "error", help: "This field is required" }}));
                return;
            } else {
                setError(error => ({...error, [field]: null}));
            }
        }

        if (field === 'value') {
            const validatedRequired = validateRequired(value);
            if (validatedRequired.error) {
                setError(error => ({...error, [field]: { validateStatus: "error", help: "This field is required" }}));
                return;
            } else {
                setError(error => ({...error, [field]: null}));
            }

            const validatedMin = validateMin(1, value);
            if (validatedMin.error)  {
                setError({...error, [field]: { validateStatus: "error", help: "add more characters" }});
                return;
            } else {
                setError({...error, [field]: null});
            }

            const validatedMax = validateMax(15, value);
            if (validatedMax.error)  {
                setError({...error, [field]: { validateStatus: "error", help: "Too long" }});
                return;
            } else {
                setError({...error, [field]: null});
            }   
        }

        if (field === 'description') {
            const validatedMax = validateMax(100, value);
            if (validatedMax.error)  {
                setError({...error, [field]: { validateStatus: "error", help: "Too long" }});
                return;
            } else {
                setError({...error, [field]: null});
            }
        }
    }

    const handleSubmit = async () => {
        validate(inputState.name, 'name');
        validate(inputState.currencyType, 'currencyType');
        validate(inputState.value, 'value');
        validate(inputState.description, 'description');

        if (
            error.name === null &&
            error.currencyType === null &&
            error.value === null &&
            error.description === null &&
            inputState.name &&
            inputState.currencyType &&
            inputState.value
        ) {
            handleAddAccount(inputState);
            setAddAccountState(false);
            return
        }
    }

    return (
        <Modal
            title="New Account"
            centered
            open={addAccountState}
            onCancel={() => setAddAccountState(false)}
            className="form-modal"
            footer={[
                <Button key={0} className="themed-button" onClick={() => handleSubmit()}>
                    Save
                </Button>,
                <Button key={1} className="themed-button" onClick={() => setAddAccountState(false)}>
                    Close
                </Button>
            ]}
    >
            <Form form={form} layout="vertical">
                <InlineField>
                    
                    <Form.Item label="Account Name" {...(error.name ? error.name: {})}>
                        <Input 
                            name="name"
                            value={inputState.name && inputState.name}
                            onChange={handleInputChange} 
                            onBlur={(e) => validate(e.target.value, 'name')}
                        />
                    </Form.Item>

                    <Form.Item label="Currency" {...(error.currencyType ? error.currencyType : {})}>
                        <Dropdown
                            name="currencyType" 
                            overlay={currencyMenu} 
                            trigger={['click']}
                        >
                            <Space className='themed-dropdown'>
                                <p className='themed-dropdown'>{currencyDropdownText}</p>
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </Form.Item>

                </InlineField>
                
                <Form.Item label="Initial Account Value" {...(error.value ? error.value: {})}>
                    <Input 
                        type="number"
                        name="value"
                        value={inputState.value && inputState.value}
                        onChange={handleInputChange}
                        onBlur={(e) => validate(e.target.value, 'value')}  
                    />
                </Form.Item>

                <Form.Item label="Account Description" {...(error.description ? error.description: {})}>
                    <TextArea 
                        name="description" 
                        rows={4}
                        value={inputState.description && inputState.description}
                        onChange={handleInputChange}   
                        onBlur={(e) => validate(e.target.value, 'description')}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}