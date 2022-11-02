import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { Navigate, useNavigate, redirect } from 'react-router-dom';
import { AuthLayout } from '../../../../components/layout/AuthLayout';
import { LoadingSpinner } from '../../../../components/LoadingSpinner/LoadingSpinner';

import { validateEmail, validateRequired, validateMax } from '../../../../utils/formValidation';
import { useSignInMutation, userAuthApi } from '../../../../store/user/user.slice';

import styles from './signInPage.module.scss';

const SignInPage = () => {

    const [signIn,
        {
            isLoading,
            data,
            isSuccess,
            error: signInError
        }
    ] = useSignInMutation();

    console.log(data);

    const [form] = Form.useForm();
    const [inputState, setInputState] = useState({});
    const [error, setError] = useState({
        email: null,
        password: null
    });
    const [signInResponseError, setSignInResponseError] = useState({
        message: null
    });

    // set error state
    useEffect(() => {
        if (signInError) {
            setSignInResponseError({
                message: signInError.data.message
            });
        }
    }, [signInError]);

    const handleInputChange = (e) => {
        setInputState({...inputState, [e.target.name]: e.target.value});
    }

    const validate = (value, field) => {
        if (field === 'email') {
            const validatedRequired = validateRequired(value);
            if (validatedRequired.error) {
                setError(error => ({...error, [field]: { validateStatus: "error", help: "This field is required" }}));
                return;
            } else {
                setError(error => ({...error, [field]: null}));
            }

            const validatedMax = validateMax(127, value);
            if (validatedMax.error)  {
                setError({...error, [field]: { validateStatus: "error", help: "Too long" }});
                return;
            } else {
                setError({...error, [field]: null});
            }

            const validatedEmail = validateEmail(value);
            if (validatedEmail.error) {
                setError(error => ({...error, [field]: { validateStatus: "error", help: "Invalid email format" }}));
                return;
            } else {
                setError(error => ({...error, [field]: null}));
            }

        }
        
        if (field === 'password') {
            const validatedRequired = validateRequired(value);
            if (validatedRequired.error) {
                setError(error => ({...error, [field]: { validateStatus: "error", help: "This field is required" }}));
                return;
            } else {
                setError(error => ({...error, [field]: null}));
            }
        }
    }
    
    const [trigger, result, lastPormiseInfo] = userAuthApi.endpoints.verifyAuth.useLazyQuery();

    const handleSubmit = async () => {
        try {
            validate(inputState.email, 'email');
            validate(inputState.password, 'password');

            if (
                error.email === null &&
                error.password === null &&
                inputState.email &&
                inputState.password
            ) {
                const response = await signIn(inputState);
                console.log('🌳', response);
                if (response.data) {
                    // if successful trigger userAuthApi and set the auth state
                    trigger();
                    // then redirect to app/home with state
                    redirect("/app/home");
                }
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <AuthLayout>
            <div className={styles.cardWrapper}>
                <div className={styles.card}>
                    {
                    isLoading ? 
                    <LoadingSpinner /> 
                    :
                    <>
                        <div className={styles.header}>
                            <h1>Welcome back.</h1>
                            <p>Please enter your credentials.</p>
                        </div>
                        {
                            signInResponseError.message && <Alert className={styles.alert} message={signInResponseError.message} type="error" />
                        }
                        <Form className={styles.form} form={form} layout="vertical">
                            <Form.Item label="Email" {...(error.email ? error.email : {})}>
                                <Input 
                                    name="email"
                                    type="email"
                                    onChange={handleInputChange} 
                                    onBlur={(e) => validate(e.target.value, 'email')}
                                />
                            </Form.Item>
                            <Form.Item label="Password" {...(error.password ? error.password : {})}>
                                <Input 
                                    type="password" 
                                    name="password" 
                                    onChange={handleInputChange}
                                    onBlur={(e) => validate(e.target.value, 'password')}
                                />
                            </Form.Item>
                        </Form>
                        <p className={styles.forgotPassword}>Forgot Password</p>
                        <Button 
                            onClick={handleSubmit} 
                            className={`themed-button ${styles.longButton}`}
                        >Sign In</Button>
                        <p className={styles.signUp}>Don't have an account ? <span className={styles.link}>Sign up</span></p>
                    </>
                    }
                </div>                
            </div>
        </AuthLayout>
    );
}

export default SignInPage;