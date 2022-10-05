import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Form, Input, Dropdown, Menu, Space, DatePicker } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import imagePlaceholder from '../../../assets/Modal/add-photos-placeholder.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { InlineField } from '../../../components/Form/InlineField';
import styles from './expenseRecordCard.module.scss';

// import moment from 'moment';

import { useGetExpenseQuery, useAddExpenseMutation, expenseApi, useUploadExpenseImagesMutation } from '../../../store/expense/expense.slice';

export const ExpenseRecordCard = ({ dateSortByState }) => { 

    const {
        data,
        isError,
        isFetching,
        isLoading,
        isSuccess
    } = expenseApi.endpoints.getExpense.useQueryState(dateSortByState);
    console.log('state 🌎', dateSortByState);

    // const {
    //     data,
    //     isLoading: queryLoading,
    //     isFetching,
    //     isSuccess,
    //     isError,
    //     error
    // } = useGetExpenseQuery('thismonth');

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
            label: <p onClick={() => setInputState({...inputState, account: 'Bank'})}>Bank</p>,
            key: '0'
        },
        {
            label: <p onClick={() => setInputState({...inputState, account: 'Personal'})}>Personal</p>,
            key: '1'
        },
        {
            label: <p onClick={() => setInputState({...inputState, account: 'Investment'})}>Investment</p>,
            key: '2',
        }
    ];

    const categoryMenuData = [
        {
            key: '0',
            label: <p onClick={() => setInputState({...inputState, category: 'Food'})}>Food</p>
        },
        {
            key: '1',
            label: <p onClick={() => setInputState({...inputState, category: 'Travel'})}>Travel</p>
        },
        {
            key: '2',
            label: <p onClick={() => setInputState({...inputState, category: 'Other'})}>Other</p>
        }
    ];

    const validate = (value, field) => {
        // validate empty fields
        if (value === "" || value === undefined) {
            setError(error => ({...error, [field]: {
                validateStatus: "error",
                help: "This field is required"
            }}));
            return;
        } else {
            setError(error => ({...error, [field]: null}));
        }

        if (field === 'title' || field === 'comment') {
            // validate min values
            if (value.length < 3) {
                setError(error => ({...error, [field]: {
                    validateStatus: "error",
                    help: "add more characters"
                }}));
                return;
            } else {
                setError(error => ({...error, [field]: null}));
            }
        }

        if (field === 'image') {
            if (imageFile.type === "image/jpeg" || imageFile.type === "image/png") {
                setError(error => ({...error, [field]: {
                    validateStatus: "error",
                    help: "only .png .jpg .jpeg are supported"
                }}));
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
            }
        } catch (error) {
            console.log(error);
        }

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

        // console.log(moment().day(0).format('YYYY-MM-DD'));
    }

    // const handleImageMutation = async () => {
    //     try {
    //         if (imageFile.length !== 0) {
    //             let expenseFormData = new FormData();
    //             imageFile.forEach((fileObject, index) => {
    //                 expenseFormData.append('expense-images', fileObject.file);
    //             });
    //             const returned = await uploadExpenseImages(expenseFormData);
    //             return returned.data.data;
    //         }
    //     } catch(error) {
    //         console.log(error);
    //         return;
    //     }
    // }

    const inputUpload = useRef(null);
    const triggerImageUpload = () => inputUpload.current.click();
    const handleImageUpload = (file) => {
        // validate, update state
        const imageObjUrl = URL.createObjectURL(file);
        setImageFile([
            ...imageFile, { blob: imageObjUrl, file }
        ]);
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
                    className="themed-button" 
                    // onClick={() => handleSubmit()}
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
                    data.data.map(item => (
                        <RecordListItem 
                            title={item.title} 
                            percentage={item.percentage} 
                            amount={item.amount} 
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

const RecordListItem = ({ title, percentage, amount }) => {
    return (
        <div className={styles.recordListItem}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faBarsStaggered} />
            </div>
                <p className={styles.name}>{title}</p>
                <p>{percentage}</p>
                <p className={styles.amount}>{amount}</p>
            <div className={styles.closeWrapper}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    );
}