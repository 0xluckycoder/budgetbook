import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Form, Input, Dropdown, Menu, Space, DatePicker, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import imagePlaceholder from '../../../../assets/Modal/add-photos-placeholder.svg';
import { InlineField } from '../../../../components/Form/InlineField';
import { validateMax, validateMin, validateRequired } from '../../../../utils/formValidation';
import { ImagePreview } from '../ImagePreview/ImagePreview';
import styles from './addModal.module.scss';

import { financeAccountApi } from '../../../../store/financeAccount/financeAccount.slice';
import { userAuthApi } from '../../../../store/user/user.slice';

import {
    useUploadExpenseImagesMutation
} from '../../../../store/expense/expense.slice';

import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { unAuthorizedErrors } from '../../../../utils/errorTypes';

export const AddModal = ({ 
    addModalState, 
    setAddModalState,
    handleAddRecord 
}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        data: financeAccountData,
        isFetching: financeAccountFetching,
        isLoading: financeAccountLoading,
        isUninitialized: financeAccountUninitiated,
    } = financeAccountApi.endpoints.getAccounts.useQueryState();

    const {
        data: authData,
        isUninitialized: authIsUninitiated,
        isLoading: authIsLoading
    } = userAuthApi.endpoints.verifyAuth.useQueryState();

    const [uploadExpenseImages, {
        isLoading: imageMutationLoading,
        data: imageResponse,
        error: uploadImageError
    }] = useUploadExpenseImagesMutation();

    /**
     * clear auth and redirect to login page if request is unauthorized
     * @param { error: { data: { message: "error message" } } }
     * */
     const logOutUnauthorizedRequests = (errorObj) => {
        if (errorObj.error) {
            if (unAuthorizedErrors.includes(errorObj.error.data.message)) {
                dispatch(userAuthApi.util.updateQueryData("verifyAuth", undefined, (draftPosts) => {
                        return draftPosts = {}
                }));
                navigate('/auth/login');
            }
        }
    }

    logOutUnauthorizedRequests({ error: uploadImageError });

    // logout user if unauthorized
    // if (uploadImageError) {
    //     if (
    //         unAuthorizedErrors.includes(uploadImageError.data.message)
    //     ) {
    //         dispatch(
    //             userAuthApi.util.updateQueryData("verifyAuth", undefined, (draftPosts) => {
    //                 return draftPosts = {}
    //             })
    //         );
    //         navigate('/auth/login');
    //     }
    // }

    const { TextArea } = Input;

    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState([]);
    const [inputState, setInputState] = useState({});
    const [error, setError] = useState({
        accountId: null,
        title: null,
        amount: null,
        category: null,
        transactionDate: null,
        image: null,
        comment: null
    });

    const handleInputChange = (e) => {
        setInputState({...inputState, [e.target.name]: e.target.value});
    }

    const [financeAccountState, setFinanceAccountState] = useState([]);

    const accountMenuData = financeAccountState.map((account, index) => {
        return {
            label: <p key={index} onClick={() => setInputState({...inputState, accountId: account._id})}>{account.name}</p>,
            key: index
        }
    });

    const categoryMenuData = [
        {
            key: '0',
            label: <p key={0} onClick={() => setInputState({...inputState, category: 'Food & Drinks'})}>Food & Drinks</p>
        },
        {
            key: '1',
            label: <p key={1} onClick={() => setInputState({...inputState, category: 'Shopping'})}>Shopping</p>
        },
        {
            key: '2',
            label: <p key={2} onClick={() => setInputState({...inputState, category: 'Housing'})}>Housing</p>
        },
        {
            key: '3',
            label: <p key={2} onClick={() => setInputState({...inputState, category: 'Transportation'})}>Transportation</p>
        },
        {
            key: '4',
            label: <p key={2} onClick={() => setInputState({...inputState, category: 'Vehicle'})}>Vehicle</p>
        },
        {
            key: '5',
            label: <p key={2} onClick={() => setInputState({...inputState, category: 'Devices'})}>Devices</p>
        },
        {
            key: '6',
            label: <p key={2} onClick={() => setInputState({...inputState, category: 'Investments'})}>Investments</p>
        },
        {
            key: '7',
            label: <p key={2} onClick={() => setInputState({...inputState, category: 'Gift'})}>Gift</p>
        },
        {
            key: '8',
            label: <p key={2} onClick={() => setInputState({...inputState, category: 'Salary'})}>Salary</p>
        },        {
            key: '9',
            label: <p key={2} onClick={() => setInputState({...inputState, category: 'Other'})}>Other</p>
        }
    ];

    const validate = (value, field) => {

        if (field === 'title') {
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

            const validatedMax = validateMax(127, value);
            if (validatedMax.error)  {
                setError({...error, [field]: { validateStatus: "error", help: "Too long" }});
                return;
            } else {
                setError({...error, [field]: null});
            }
            
        } 
        
        if (field === 'amount') {
            const validatedRequired = validateRequired(value);
            if (validatedRequired.error) {
                setError(error => ({...error, [field]: { validateStatus: "error", help: 'This field is required' }}));
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

        } 
        
        if (field === 'comment' && value) {
            const validatedMax = validateMax(200, value);
            if (validatedMax.error)  {
                setError({...error, [field]: { validateStatus: "error", help: "Too long" }});
                return;
            } else {
                setError({...error, [field]: null});
            }
        } 
        
        if (field === 'accountId' || field === 'category' || field === 'transactionDate') {
            const validatedRequired = validateRequired(value);
            if (validatedRequired.error) {
                setError(error => ({...error, [field]: { validateStatus: "error", help: 'This field is required' }}));
                return;
            } else {
                setError(error => ({...error, [field]: null}));
            }
        }
    }

    const constructFormData = (arrayOfFiles) => {
        if (arrayOfFiles.length !== 0) {
            let expenseFormData = new FormData();
            imageFile.forEach((fileObject, index) => {
                expenseFormData.append('expense-images', fileObject.file);
            });
            return expenseFormData;
        } else {
            return null;
        }  
    }

    const handleSubmit = async () => {
        try {
            // validate every field before submit
            validate(inputState.title, 'title');
            validate(inputState.amount, 'amount');
            validate(inputState.accountId, 'accountId');
            validate(inputState.category, 'category');
            validate(inputState.transactionDate, 'transactionDate');
            validate(inputState.comment, 'comment');

            if (
                error.title === null &&
                error.amount === null &&
                error.accountId === null &&
                error.category === null &&
                error.transactionDate === null &&
                error.comment === null &&
                inputState.title &&
                inputState.amount &&
                inputState.accountId &&
                inputState.category &&
                inputState.transactionDate
            ) {
                const formData = constructFormData(imageFile);
                if (formData) {
                    const returned = await uploadExpenseImages(formData);
                    handleAddRecord({...inputState, photos: returned.data.data });
                    return;
                }

                handleAddRecord({...inputState });

                setAddModalState(false);
                setInputState({});
                setImageFile([]);
                setError({
                    title: null,
                    amount: null,
                    accountId: null,
                    comment: null,
                    transactionDate: null,
                    category: null
                });
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        setInputState({});
        setAddModalState(false);
        setImageFile([]);
        setError({
            title: null,
            amount: null,
            accountId: null,
            comment: null,
            transactionDate: null,
            category: null
        });
    }

    const inputUpload = useRef(null);
    const triggerImageUpload = () => inputUpload.current.click();
    const handleImageUpload = (file) => {
        if (file.size > 1024 * 1024) {
            alert('file is too large');
            return;
        }

        if (file.type === "image/jpeg" || file.type === "image/png") {
            const imageObjUrl = URL.createObjectURL(file);
            setImageFile([
                ...imageFile, { blob: imageObjUrl, file }
            ]);
        } else {
            alert('invalid file type');
            return;
        }
    }

    useEffect(() => {
        if (!financeAccountLoading && !financeAccountFetching && !financeAccountUninitiated) {
            setFinanceAccountState(financeAccountData.data);
        }
    }, [financeAccountData]);

    const accountMenu = <Menu onBlur={() => validate(inputState.accountId, 'accountId')} items={accountMenuData} />;
    const categoryMenu = <Menu onBlur={() => validate(inputState.category, 'category')}  items={categoryMenuData} />;
    
    const accountDropdownText = inputState.accountId === undefined 
    ? { name: 'Select Account' } 
    : financeAccountState.find(item => item._id === inputState.accountId);

    const categoryDropdownText = inputState.category === undefined 
    ? 'Select Category' 
    : inputState.category;

    return (
        <Modal
            title="Add"
            centered
            open={addModalState}
            onCancel={() => handleClose()}
            className="form-modal"
            footer={[
                <Button 
                    key={1}
                    className="themed-button"
                    onClick={() => handleSubmit()}
                >
                Save
                </Button>
            ]}
        >
            <Form form={form} layout="vertical">
                <InlineField>
                    <Form.Item label="Title" {...(error.title ? error.title : {})}>
                        <Input
                            value={inputState.title && inputState.title} 
                            name="title" 
                            onChange={handleInputChange} 
                            onBlur={(e) => validate(e.target.value, 'title')}
                        />
                    </Form.Item>
                    <Form.Item label="Amount" {...(error.amount ? error.amount : {})}>
                        <Input 
                            type='number'
                            value={inputState.amount && inputState.amount} 
                            name="amount" 
                            onChange={handleInputChange} 
                            onBlur={(e) => validate(e.target.value, 'amount')}
                        />
                    </Form.Item>
                </InlineField>

                <InlineField>
                    <Form.Item label="Account" {...(error.accountId ? error.accountId : {})}>
                    {
                        <Dropdown 
                            overlay={accountMenu}
                            trigger={['click']} 
                            name="accountId" 
                            value={inputState.accountId}
                        >
                            <Space className='themed-dropdown'>
                                <p className='themed-dropdown'>{accountDropdownText.name}</p>
                                <DownOutlined />
                            </Space>
                        </Dropdown>

                    }
                    </Form.Item>
                    <Form.Item label="Category" {...(error.category ? error.category : {})}>
                        <Dropdown
                            overlay={categoryMenu} 
                            trigger={['click']}
                            value={inputState.category && inputState.category} 
                        >
                            <Space className='themed-dropdown'>
                                <p>{categoryDropdownText}</p>
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </Form.Item>
                </InlineField>

                <Form.Item label="Transaction Date" {...(error.transactionDate ? error.transactionDate : {})}>
                    <Space direction="vertical">
                        <DatePicker 
                            onChange={(date, dateString) => setInputState({...inputState, transactionDate: dateString})}
                            onBlur={() => validate(inputState.transactionDate, 'transactionDate')}
                        />
                    </Space>
                </Form.Item>

                <Form.Item label="Comment" {...(error.comment ? error.comment : {})}>
                    <TextArea 
                        name="comment" 
                        value={inputState.comment} 
                        onChange={handleInputChange} 
                        rows={4}
                        onBlur={(e) => validate(e.target.value, 'comment')}
                    />
                </Form.Item>

                <Form.Item label="Add Photos">
                    <div className={styles.verticalImageSlider}>
                        <input 
                            name="expense-images"
                            type="file"
                            className={styles.uploadButton}
                            ref={inputUpload}
                            onChange={(e) => handleImageUpload(e.target.files[0])}
                            hidden
                        />
                        {
                            imageFile.length > 0 && imageFile.map(fileItem => <ImagePreview 
                                                                                hideDelete={false}
                                                                                imageState={imageFile} 
                                                                                setImageState={setImageFile} 
                                                                                imageSrc={fileItem.blob}
                                                                                inputState={inputState} 
                                                                            />)
                        }

                        {
                            imageFile.length >= 3 || <img 
                                                        onClick={triggerImageUpload} 
                                                        src={imagePlaceholder} 
                                                        alt="placeholder" 
                                                        className={styles.imageUploadPlaceholder}
                                                    />
                        }
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}