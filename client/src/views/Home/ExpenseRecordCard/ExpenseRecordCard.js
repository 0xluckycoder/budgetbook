import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Form, Input, Dropdown, Menu, Space, DatePicker } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import imagePlaceholder from '../../../assets/Modal/add-photos-placeholder.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { InlineField } from '../../../components/Form/InlineField';
import styles from './expenseRecordCard.module.scss';

// import moment from 'moment';

import {useAddExpenseMutation, expenseApi, useUploadExpenseImagesMutation } from '../../../store/expense/expense.slice';

export const ExpenseRecordCard = ({ dateSortByState }) => { 

    const {
        data,
        isError,
        isFetching,
        isLoading,
        isSuccess
    } = expenseApi.endpoints.getExpense.useQueryState(dateSortByState);

    const [addExpense, {
        isLoading: addMutationLoading 
    }] = useAddExpenseMutation();

    const [uploadExpenseImages, {
        isLoading: imageMutationLoading,
        data: imageResponse
    }] = useUploadExpenseImagesMutation();
    
    const { TextArea } = Input;

    const [addModalState, setAddModalState] = useState(false);
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState([]);
    const [inputState, setInputState] = useState({});
    const [error, setError] = useState({
        title: null,
        amount: null,
        account: null,
        comment: null,
        transactionDate: null,
        category: null,
        image: null
    });
    
    const handleInputChange = (e) => {
        setInputState({...inputState, [e.target.name]: e.target.value});
    }

    const accountMenuData = [
        {
            label: <p key={0} onClick={() => setInputState({...inputState, account: 'Bank'})}>Bank</p>,
            key: '0'
        },
        {
            label: <p key={1} onClick={() => setInputState({...inputState, account: 'Personal'})}>Personal</p>,
            key: '1'
        },
        {
            label: <p key={2} onClick={() => setInputState({...inputState, account: 'Investment'})}>Investment</p>,
            key: '2',
        }
    ];

    const categoryMenuData = [
        {
            key: '0',
            label: <p key={0} onClick={() => setInputState({...inputState, category: 'Food'})}>Food</p>
        },
        {
            key: '1',
            label: <p key={1} onClick={() => setInputState({...inputState, category: 'Travel'})}>Travel</p>
        },
        {
            key: '2',
            label: <p key={2} onClick={() => setInputState({...inputState, category: 'Other'})}>Other</p>
        }
    ];

    // if want to skip just pass false as an argument
    const validateMin = (min, value) => {
        if (min) {
            // validate min value
            if (value.length !== 0 && value.length < min) {
                return {
                    error: true
                }
            } else {
                return {
                    error: false
                };
            } 
        }
    }

    const validateMax = (max, value) => {
        if (max) {
            // validate max value
            if (value.length > max) {
                return {
                    error: true
                }
            } else {
                return {
                    error: false
                };
            }
        }
    }

    const validateRequired = (value) => {
        if (value === "" || value === undefined) {
            return {
                error: true
            }
        } else {
            return {
                error: false
            }
        }
    }

    const validate = (value, field) => {

        if (field === 'title') {
            const validatedRequired = validateRequired(value);
            if (validatedRequired.error) {
                setError(error => ({...error, [field]: { validateStatus: "error", help: "This field is required" }}));
                return;
            } else {
                setError(error => ({...error, [field]: null}));
            }

            const validatedMin = validateMin(3, value);
            if (validatedMin.error)  {
                setError({...error, [field]: { validateStatus: "error", help: "add more characters" }});
                return;
            } else {
                setError({...error, [field]: null});
            }

            const validatedMax = validateMax(5, value);
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
            
            const validatedMax = validateMax(10, value);
            if (validatedMax.error)  {
                setError({...error, [field]: { validateStatus: "error", help: "Too long" }});
                return;
            } else {
                setError({...error, [field]: null});
            }

        } 
        
        if (field === 'comment') {
            const validatedMin = validateMin(3, value);
            if (validatedMin.error)  {
                setError({...error, [field]: { validateStatus: "error", help: "add more characters" }});
                return;
            } else {
                setError({...error, [field]: null});
            }

            const validatedMax = validateMax(5, value);
            if (validatedMax.error)  {
                setError({...error, [field]: { validateStatus: "error", help: "Too long" }});
                return;
            } else {
                setError({...error, [field]: null});
            }
        } 
        
        if (field === 'account' || field === 'category' || field === 'transactionDate') {
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

    const accountMenu = <Menu onBlur={() => validate(inputState.account, 'account')} items={accountMenuData} />;
    const categoryMenu = <Menu onBlur={() => validate(inputState.category, 'category')}  items={categoryMenuData} />;

    const handleSubmit = async () => {
        try {
            // validate every field before submit
            validate(inputState.title, 'title');
            validate(inputState.amount, 'amount');
            validate(inputState.account, 'account');
            validate(inputState.category, 'category');
            validate(inputState.transactionDate, 'transactionDate');
            validate(inputState.comment, 'comment');

            if (
                error.title === null &&
                error.amount === null &&
                error.account === null &&
                error.category === null &&
                error.transactionDate === null &&
                error.comment === null &&
                inputState.title &&
                inputState.amount &&
                inputState.account &&
                inputState.category &&
                inputState.transactionDate
            ) {
                const formData = constructFormData(imageFile);
                if (formData) {
                    const returned = await uploadExpenseImages(formData);
                    console.log(returned.data.data);
                    await addExpense({...inputState, photos: returned.data.data }).unwrap();
                    return;
                }
                await addExpense({...inputState }).unwrap();

                setAddModalState(false);
                setInputState({});
                setImageFile([]);
                setError({
                    title: null,
                    amount: null,
                    account: null,
                    comment: null,
                    transactionDate: null,
                    category: null
                });
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
            account: null,
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

    const accountDropdownText = inputState.account === undefined ? 'Select Account' : inputState.account;
    const categoryDropdownText = inputState.category === undefined ? 'Select Category' : inputState.category;

    return (
        <div className={styles.recordCardWrapper}>
            <div className={styles.cardHeading}>
                <p>Expense Record</p>
            </div>

            <Button className="themed-button" type="primary" onClick={() => setAddModalState(true)}>
                Add
            </Button>

            {/* add new expense modal */}
            <Modal
                title="New Expense"
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
                        <Form.Item label="Account" {...(error.account ? error.account : {})}>
                            <Dropdown 
                                overlay={accountMenu}
                                trigger={['click']} 
                                name="account" 
                                value={inputState.account}
                            >
                                <Space className='themed-dropdown'>
                                    <p className='themed-dropdown'>{accountDropdownText}</p>
                                    <DownOutlined />
                                </Space>
                            </Dropdown>
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
                                imageFile.length > 0 && imageFile.map(fileItem => <img src={fileItem.blob} alt="uploaded slide item" />)
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
            
            <RecordListWrapper>
                {
                    data !== undefined 
                    ? 
                    data.data.map((item, index) => (
                        <RecordListItem
                            key={index}
                            itemData={item} 
                            // title={item.title} 
                            // percentage={item.percentage} 
                            // amount={item.amount} 
                        />
                    ))
                    : <h2>Loading...</h2>
                }
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

const RecordListItem = ({ itemData }) => {

    console.log(itemData, 'data');

    const [addModalState, setAddModalState] = useState(false);
    const [form] = Form.useForm();
    const { TextArea } = Input;

    const handleClose = () => {
        setAddModalState(false);
    }

    return (
        <div className={styles.recordListItem}>
            <div onClick={() => setAddModalState(true)} className={styles.icon}>
                <FontAwesomeIcon icon={faBarsStaggered} />
            </div>

            {/* add new expense modal */}
            <Modal
                title="Expense Item"
                centered
                open={addModalState}
                onCancel={() => handleClose()}
                className="form-modal"
                footer={[
                //   <Button 
                //     key={1}
                //     className="themed-button"
                //     // onClick={() => handleSubmit()}
                //    >
                //     Edit
                //   </Button>
                ]}
            >
                <Form form={form} layout="vertical">
                    <InlineField>
                        <Form.Item label="Title">
                            <Input 
                                name="title"
                                value={itemData.title}
                            />
                        </Form.Item>
                        <Form.Item label="Amount">
                            <Input 
                                type='number'
                                name="amount"
                                value={itemData.amount}
                            />
                        </Form.Item>
                    </InlineField>

                    <InlineField>
                        <Form.Item label="Account">
                            <Input 
                                name="account"
                                value={itemData.account}
                            />
                        </Form.Item>
                        <Form.Item label="category">
                            <Input 
                                name="category"
                                value={itemData.category}
                            />
                        </Form.Item>
                    </InlineField>

                    <Form.Item label="date">
                        <Input 
                            name="date"
                            value={itemData.transactionDate} 
                        />
                    </Form.Item>

                    <Form.Item label="Comment">
                        <TextArea 
                            name="comment"  
                            rows={4}
                            value={itemData.comment}
                        />
                    </Form.Item>

                    <Form.Item label="Add Photos">
                        {/* <div className={styles.verticalImageSlider}>
                            <input 
                                name="expense-images"
                                type="file"
                                className={styles.uploadButton}
                                ref={inputUpload}
                                onChange={(e) => handleImageUpload(e.target.files[0])}
                                hidden
                            />
                            {
                                imageFile.length > 0 && imageFile.map(fileItem => <img src={fileItem.blob} alt="uploaded slide item" />)
                            }

                            {
                                imageFile.length >= 3 || <img 
                                                            onClick={triggerImageUpload} 
                                                            src={imagePlaceholder} 
                                                            alt="placeholder" 
                                                            className={styles.imageUploadPlaceholder}
                                                        />
                            }
                        </div> */}
                    </Form.Item>
                </Form>
            </Modal>

                <p className={styles.name}>{itemData.title}</p>
                <p>{itemData.percentage}</p>
                <p className={styles.amount}>{itemData.amount}</p>
            <div className={styles.closeWrapper}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    );
}