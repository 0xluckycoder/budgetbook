import React, { useEffect, useState } from "react";
import styles from './stepTwo.module.scss';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Button, Dropdown, Space, Menu } from "antd";
import { InlineField } from "../../../../components/Form/InlineField";
import { Navigation } from "../Navigation/Navigation";
import profilePlaceholder from '../../../../assets/Settings/settings-user-placeholder.svg';

export const StepTwo = ({
    width, 
    height, 
    inputState,
    setInputState,
    handleInputChange,
    validate,
    error,
    handleBackNavigation,
    handleNextNavigation
}) => {

    

    const [isValidated, setIsValidated] = useState(false);

    const [form] = Form.useForm();

    const languageMenuData = [
        {
            label: <p key={0} onClick={() => setInputState({...inputState, language: 'English'})}>English</p>,
            key: '0'
        }
    ];

    const countryMenuData = [
        {
            label: <p key={0} onClick={() => setInputState({...inputState, country: 'Sri Lanka'})}>Sri Lanka</p>,
            key: '0'
        },
        {
            label: <p key={0} onClick={() => setInputState({...inputState, country: 'United States'})}>United States</p>,
            key: '1'
        }
    ];

    const languageMenu = <Menu onBlur={() => validate(inputState.language, 'language')} items={languageMenuData} />;
    const countryMenu = <Menu onBlur={() => validate(inputState.country, 'country')} items={countryMenuData} />;

    const languageDropdownText = inputState.language === undefined ? 'Select Language' : inputState.language;
    const countryDropdownText = inputState.country === undefined ? 'Select Country' : inputState.country;

    // trigger this function on blur
    const validateStep = () => {
        if (
                error.firstName === null &&
                error.lastName === null &&
                error.language === null &&
                error.country === null &&
                inputState.firstName &&
                inputState.lastName &&
                inputState.language &&
                inputState.country
            ) {
                setIsValidated(true);
        } else {
            setIsValidated(false);
        }
    }

    useEffect(() => {
        validateStep();
    }, [error, inputState]);

    return (
        <div style={{
            top: `calc(50% - ${height}px/2 + 60px/2)`,
            maxWidth: width,
            minHeight: height
        }} className={styles.card}>
            <div className={styles.header}>
                <h1>User Information.</h1>
                <p>Provide information for create a new account</p>
            </div>

            <Form className={styles.form} form={form} layout="vertical">

                <InlineField>
                    <Form.Item label="First Name" {...(error.firstName ? error.firstName : {})}>
                        <Input
                            name="firstName"
                            type="text"
                            value={inputState.firstName && inputState.firstName}
                            onChange={handleInputChange}
                            onBlur={(e) => validate(e.target.value, 'firstName')}
                        />
                    </Form.Item>

                    <Form.Item label="Last Name" {...(error.lastName ? error.lastName : {})}>
                        <Input
                            name="lastName"
                            type="text"
                            value={inputState.lastName && inputState.lastName}
                            onChange={handleInputChange}
                            onBlur={(e) => validate(e.target.value, 'lastName')}
                        />
                    </Form.Item>
                </InlineField>

                <InlineField>
                    <Form.Item label="Language" {...(error.language ? error.language : {})}>
                        <Dropdown
                            overlay={languageMenu} 
                            trigger={['click']}
                            value={inputState.language && inputState.language} 
                        >
                            <Space className='themed-dropdown'>
                                <p>{languageDropdownText}</p>
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </Form.Item>

                    <Form.Item label="Country" {...(error.country ? error.country : {})}>
                        <Dropdown
                            overlay={countryMenu} 
                            trigger={['click']}
                            value={inputState.country && inputState.country} 
                        >
                            <Space className='themed-dropdown'>
                                <p>{countryDropdownText}</p>
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </Form.Item>
                </InlineField>

                <Navigation 
                    step={1} 
                    handleBackNavigation={handleBackNavigation}
                    handleNextNavigation={handleNextNavigation}
                    isValidated={isValidated}
                    // submitStep={submitStep}
                />

            </Form>
        </div>
    );
}