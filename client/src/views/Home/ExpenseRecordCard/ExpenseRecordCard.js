import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import styles from './expenseRecordCard.module.scss';

import { 
    useAddExpenseMutation, 
    expenseApi, 
    useEditExpenseMutation,
    useDeleteExpenseMutation
} from '../../../store/expense/expense.slice';
import { userAuthApi } from '../../../store/user/user.slice';

import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';

import { AddCustomModal } from '../../../components/Modals/AddCustomModal/AddCustomModal';
import { ViewCustomModal } from '../../../components/Modals/ViewCustomModal/ViewCustomModal';
import { EditCustomModal } from '../../../components/Modals/EditCustomModal/EditCustomModal';
import { DialogueCard } from '../../../components/DialogueCard/DialogueCard';

import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { unAuthorizedErrors } from '../../../utils/errorTypes';

export const ExpenseRecordCard = ({ dateSortByState, result }) => { 

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [addModalState, setAddModalState] = useState(false);

    const [addExpense, {
        isLoading: addMutationLoading,
        error: addExpenseError 
    }] = useAddExpenseMutation();

    // // logout user if unauthorized
    // if (addExpenseError) {
    //     if (unAuthorizedErrors.includes(addExpenseError.data.message)) {
    //         dispatch(
    //             userAuthApi.util.updateQueryData("verifyAuth", undefined, (draftPosts) => {
    //                 return draftPosts = {}
    //             })
    //         );
    //         navigate('/auth/login');
    //     }
    // }

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

    logOutUnauthorizedRequests({error: addExpenseError});

    // send add request
    const handleAddRecord = async (inputState) => {
        try {
            await addExpense({
                accountId: inputState.accountId,
                expenseData: {
                    title: inputState.title,
                    amount: inputState.amount,
                    category: inputState.category,
                    transactionDate: inputState.transactionDate,
                    comment: inputState.comment,
                    photos: inputState.photos
                }
            }).unwrap();
        } catch(error) {
            console.log(error);
        }
        setAddModalState(false);
    }

    return (
        <div className={styles.recordCardWrapper}>
            <div className={styles.cardHeading}>
                <p>Expense Records</p>
            </div>

            <Button className="themed-button" type="primary" onClick={() => setAddModalState(true)}>
                Add
            </Button>

            {/* add new expense modal */}
            <AddCustomModal 
                addModalState={addModalState}
                setAddModalState={setAddModalState}
                handleAddRecord={handleAddRecord}
            />
            
            <RecordListWrapper>
                {
                    result.data !== undefined 
                    ? 
                    result.data.map((item, index) => (
                        <RecordListItem
                            key={index}
                            itemData={item}
                            dateSortByState={dateSortByState}
                        />
                    ))
                    : <LoadingSpinner />
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

const RecordListItem = ({ itemData, dateSortByState }) => {    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // view modal state
    const [viewModalState, setViewModalState] = useState(false);
    // edit modal state
    const [editModalState, setEditModalState] = useState(false);
    // dialogue card state
    const [dialogueCardState, setDialogueCardState] = useState(false);

    const handleClose = () => {
        setViewModalState(false);
    }

    const handleEditButton = () => {
        handleClose();
        setEditModalState(true);
    }

    const [deleteExpense, {
        data: deleteResponse,        
        isLoading: deleteExpenseMutationLoading,
        error: deleteExpenseError
    }] = useDeleteExpenseMutation();

    const [editExpense, {
        isLoading: editExpenseMutationLoading,
        data: editResponse,
        error: editExpenseError
    }] = useEditExpenseMutation();

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

    logOutUnauthorizedRequests({ error: deleteExpenseError });
    logOutUnauthorizedRequests({ error: editExpenseError });
    
    // logout user if unauthorized
    // if (
    //     deleteExpenseError ||
    //     editExpenseError
    // ) {
    //     if (
    //         unAuthorizedErrors.includes(deleteExpenseError.data.message) ||
    //         unAuthorizedErrors.includes(editExpenseError.data.message)
    //     ) {
    //         dispatch(
    //             userAuthApi.util.updateQueryData("verifyAuth", undefined, (draftPosts) => {
    //                 return draftPosts = {}
    //             })
    //         );
    //         navigate('/auth/login');
    //     }
    // }

    // send delete request
    const handleDelete = async (id) => {
        try {
            await deleteExpense(id).unwrap();
        } catch(error) {
            console.log(error);
        }
    }

    // send edit request
    const handleEditRecord = async (editData) => {
        try {
            await editExpense(editData);
        } catch(error) {
            console.log(error);
        }
    }

    const handleConfirm = () => {
        setDialogueCardState(false);
        handleDelete(itemData._id);
        setViewModalState(false);
    }

    const confirmDeleteCheck = () => {
        setDialogueCardState(true);
    }

    return (
        <>
        {/* view expense modal */}
        <ViewCustomModal
            viewModalState={viewModalState}
            setViewModalState={setViewModalState}
            itemData={itemData}
            handleEditButton={handleEditButton}
            handleDelete={confirmDeleteCheck}
            handleClose={handleClose}
        />

        {/* Warning Dialogue Card */}
        <DialogueCard 
            message={"Are you sure you want to delete this expense item ?"}
            dialogueCardState={dialogueCardState}
            setDialogueCardState={setDialogueCardState}
            handleConfirm={handleConfirm}
        />

        {/* edit expense */}
        <EditCustomModal
            editModalState={editModalState}
            setEditModalState={setEditModalState}
            itemData={itemData}
            dateSortByState={dateSortByState}
            handleEditRecord={handleEditRecord}
        />

        <div className={styles.recordListItem}>
            <div onClick={() => setViewModalState(true)} className={styles.icon}>
                <FontAwesomeIcon icon={faBarsStaggered} />
            </div>
                <p className={styles.name}>{itemData.title}</p>
                <p className={styles.amount}>{itemData.amount}</p>
            <div onClick={() => setDialogueCardState(true)} className={styles.closeWrapper}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
        </>
    );
}


