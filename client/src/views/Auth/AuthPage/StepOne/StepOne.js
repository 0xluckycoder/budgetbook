import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import styles from './stepOne.module.scss';
import { validateMax, validateMin, validateRequired } from "../../../../utils/formValidation";
export const StepOne = ({ 
    width, 
    height, 
    inputState,
    handleInputChange,
    validate,
    error
}) => {

    const [form] = Form.useForm();

    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    
    // validate password match
    const confirmPasswordValidation = (passwordValue, confirmPasswordValue) => {
        if (passwordValue && confirmPasswordValue) {
            if (passwordValue !== confirmPasswordValue) {
                setConfirmPasswordError('Passwords does not match');
            } else {
                setConfirmPasswordError(null);
            }
        }
    }

    return (
        <div style={{
            top: `calc(50% - ${height}px/2 + 60px/2)`,
            minWidth: width,
            minHeight: height
        }} className={styles.card}>

            <div className={styles.header}>
                <h1>Create New Account</h1>
                <p>Please enter your credentials</p>
            </div>
            {
                confirmPasswordError && <Alert className={styles.alert} message={confirmPasswordError} type="error" />
            }
            <Form className={styles.form} form={form} layout="vertical">
                <Form.Item label="Email" {...(error.email ? error.email : {})}>
                    <Input
                        name="email"
                        type="email"
                        value={inputState.email && inputState.email}
                        onChange={handleInputChange}
                        onBlur={(e) => validate(e.target.value, 'email')}
                    />
                </Form.Item>
                <Form.Item label="Password" {...(error.password ? error.password : {})}>
                    <Input
                        name="password"
                        type="password"
                        value={inputState.password && inputState.password}
                        onChange={handleInputChange}
                        onBlur={(e) => validate(e.target.value, 'password')}
                    />
                </Form.Item>
                <Form.Item label="Confirm Password" {...(error.confirmPassword ? error.confirmPassword : {})}>
                    <Input
                        name="confirmPassword"
                        type="password"
                        value={inputState.confirmPassword && inputState.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={(e) => validate(e.target.value, 'confirmPassword')}
                    />
                </Form.Item>
            </Form>
            <Button 
                className={`themed-button ${styles.longButton}`}
                onClick={() => confirmPasswordValidation(inputState.password, inputState.confirmPassword)}
            >
                Sign up
            </Button>
            <p className={styles.signIn}>Already have an account ?<span className={styles.link}> Sign In</span></p>
        </div>
    );
}