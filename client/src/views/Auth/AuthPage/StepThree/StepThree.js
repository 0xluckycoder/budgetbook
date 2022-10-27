import React, { useState, useEffect } from "react";
import styles from './stepThree.module.scss';

import { Form, Input, Dropdown, Space, Menu } from "antd";
import { InlineField } from "../../../../components/Form/InlineField";
import { DownOutlined } from '@ant-design/icons';
import { Navigation } from "../Navigation/Navigation";

export const StepThree = ({
    width,
    height,
    error,
    inputState,
    setInputState,
    handleInputChange,
    validate,
    handleNextNavigation,
    handleBackNavigation
}) => {

    const [isValidated, setIsValidated] = useState(false);

    const [form] = Form.useForm();

    const { TextArea } = Input;

    const currencyMenuData = [
        {
            label: <p key={0} onClick={() => setInputState({...inputState, currency: 'USD'})}>USD</p>,
            key: '0'
        },
        {
            label: <p key={1} onClick={() => setInputState({...inputState, currency: 'Yuan'})}>Yuan</p>,
            key: '1'
        },
        {
            label: <p key={2} onClick={() => setInputState({...inputState, currency: 'Yen'})}>Yen</p>,
            key: '2',
        }
    ];

    const validateStep = () => {
        if (
                error.accountName === null &&
                error.initialAmount === null &&
                error.currency === null &&
                error.description === null &&
                inputState.accountName &&
                inputState.initialAmount &&
                inputState.currency
            ) {
                setIsValidated(true);
        } else {
            setIsValidated(false);
        }
    }

    useEffect(() => {
        validateStep();
    }, [error, inputState]);

    const currencyMenu = <Menu onBlur={() => validate(inputState.currency, 'currency')} items={currencyMenuData} />;
    const currencyDropdownText = inputState.currency === undefined ? 'Select Currency' : inputState.currency;

    return (
        <div style={{
            top: `calc(50% - ${height}px/2 + 60px/2)`,
            minWidth: width,
            minHeight: height
        }} className={styles.card}>
            <div className={styles.header}>
                <h1>Finance Account Setup.</h1>
                <p>Create you first finance account to get started</p>
            </div>
            <Form className={styles.form} form={form} layout="vertical">
            <InlineField>
                    <Form.Item label="Account Name" {...(error.accountName ? error.accountName : {})}>
                        <Input
                            name="accountName"
                            type="text"
                            value={inputState.accountName && inputState.accountName}
                            onChange={handleInputChange}
                            onBlur={(e) => validate(e.target.value, 'accountName')}
                        />
                    </Form.Item>

                    <Form.Item label="Initial Amount" {...(error.initialAmount ? error.initialAmount : {})}>
                        <Input
                            name="initialAmount"
                            type="text"
                            value={inputState.initialAmount && inputState.initialAmount}
                            onChange={handleInputChange}
                            onBlur={(e) => validate(e.target.value, 'initialAmount')}
                        />
                    </Form.Item>
                </InlineField>

                <Form.Item label="Currency" {...(error.currency ? error.currency : {})}>
                    <Dropdown
                        overlay={currencyMenu} 
                        trigger={['click']}
                        value={inputState.currency && inputState.currency} 
                    >
                        <Space className='themed-dropdown'>
                            <p>{currencyDropdownText}</p>
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                </Form.Item>

                <Form.Item label="Description" {...(error.description ? error.description : {})}>
                    <TextArea 
                        name="description" 
                        value={inputState.description} 
                        onChange={handleInputChange} 
                        rows={4}
                        onBlur={(e) => validate(e.target.value, 'description')}
                    />
                </Form.Item>

                <Navigation 
                    step={2} 
                    handleBackNavigation={handleBackNavigation}
                    handleNextNavigation={handleNextNavigation}
                    isValidated={isValidated}
                    // submitStep={submitStep}
                />

            </Form>
        </div>
    );
}