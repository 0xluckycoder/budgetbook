import React, { useState, useEffect } from 'react';
import { AuthLayout } from '../../../../components/layout/AuthLayout';
import styles from './signUp.module.scss';

import { Button } from 'antd';

import { StepOne } from '../StepOne/StepOne';
import { StepTwo } from '../StepTwo/StepTwo';
import { StepThree } from '../StepThree/StepThree';
import { StepFour } from '../StepFour/StepFour';
import { 
    validateRequired,
    validateEmail,
    validateMin,
    validateMax
} from '../../../../utils/formValidation';

const SignUpPage = () => {

    const [step, setStep] = useState(1);
    const [imageFile, setImageFile] = useState([]);
    const [inputState, setInputState] = useState({});
    const [error, setError] = useState({
        email: null,
        password: null,
        confirmPassword: null,
        profilePic: null,
        firstName: null,
        lastName: null,
        language: null,
        country: null,
        accountName: null,
        initialAmount: null,
        currency: null,
        description: null
    });

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

            const validatedMax = validateMax(255, value);
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

        if (field === 'password' || field === 'confirmPassword') {
            const validatedRequired = validateRequired(value);
            if (validatedRequired.error) {
                setError(error => ({...error, [field]: { validateStatus: "error", help: "This field is required" }}));
                return;
            } else {
                setError(error => ({...error, [field]: null}));
            }

            const validatedMin = validateMin(8, value);
            if (validatedMin.error)  {
                setError({...error, [field]: { validateStatus: "error", help: "add more characters" }});
                return;
            } else {
                setError({...error, [field]: null});
            }
        }
    }

    const handleNextNavigation = () => setStep(step => step + 1);

    const handleBackNavigation = () => setStep(step => step - 1);

    return (
        <AuthLayout>
            <div className={styles.cardWrapper}>
                {step === 1 && <StepOne 
                                    width={350} 
                                    height={478}
                                    error={error}
                                    inputState={inputState}
                                    handleInputChange={handleInputChange}
                                    validate={validate} 
                                    handleNextNavigation={handleNextNavigation}
                                    handleBackNavigation={handleBackNavigation}
                                />}
                {step === 2 && <StepTwo 
                                    width={563}
                                    height={518}
                                    error={error}
                                    inputState={inputState}
                                    setInputState={setInputState}
                                    handleInputChange={handleInputChange}
                                    validate={validate}
                                />}
                {/* <StepOne 
                    width={350} 
                    height={478}
                    error={error}
                    inputState={inputState}
                    handleInputChange={handleInputChange}
                    validate={validate} 
                /> */}
                {/* <StepTwo 
                    width={563}
                    height={518}
                    error={error}
                    inputState={inputState}
                    setInputState={setInputState}
                    handleInputChange={handleInputChange}
                    validate={validate}
                /> */}
            </div>
            {/* <div className={styles.bottomMenu}>
                <h1>dot</h1>
                <Button className='themed-button'>Next</Button>
                <Button className='themed-button'>Back</Button>
            </div> */}
        </AuthLayout>
    );
}

export default SignUpPage;