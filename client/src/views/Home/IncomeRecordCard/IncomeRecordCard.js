import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import styles from './incomeRecordCard.module.scss';

import { 
    incomeApi,
    useAddIncomeMutation,
    useEditIncomeMutation,
    useDeleteIncomeMutation
} from '../../../store/income/income.slice';
import { userAuthApi } from '../../../store/user/user.slice';

import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';

import { AddCustomModal } from '../../../components/Modals/AddCustomModal/AddCustomModal';
import { ViewCustomModal } from '../../../components/Modals/ViewCustomModal/ViewCustomModal';
import { EditCustomModal } from '../../../components/Modals/EditCustomModal/EditCustomModal';
import { DialogueCard } from '../../../components/DialogueCard/DialogueCard';

import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { unAuthorizedErrors } from '../../../utils/errorTypes';

export const IncomeRecordCard = ({ dateSortByState, result }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [addModalState, setAddModalState] = useState(false);

    const [addIncome, {
        isLoading: addMutationLoading,
        error: addIncomeError
    }] = useAddIncomeMutation();

    // send add request
    const handleAddRecord = async (inputState) => {
        try {
            await addIncome({
                accountId: inputState.accountId,
                incomeData: {
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

    // logout user if unauthorized
    if (addIncomeError) {
        if (unAuthorizedErrors.includes(addIncomeError.data.message)) {
            dispatch(
                userAuthApi.util.updateQueryData("verifyAuth", undefined, (draftPosts) => {
                    return draftPosts = {}
                })
            );
            navigate('/auth/login');
        }
    }

    return (
        <div className={styles.recordCardWrapper}>
            <div className={styles.cardHeading}>
                <p>Incomes Records</p>
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

    const [deleteIncome, {
        data: deleteResponse,
        isLoading: deleteIncomeMutationLoading,
        error: deleteIncomeError
    }] = useDeleteIncomeMutation();

    const [editIncome, {
        data: editLoading,
        isLoading: editIncomeMutationLoading,
        error: editIncomeError
    }] = useEditIncomeMutation();

    // logout user if unauthorized
    if (
        deleteIncomeError ||
        editIncomeError
    ) {
        if (
            unAuthorizedErrors.includes(deleteIncomeError.data.message) ||
            unAuthorizedErrors.includes(editIncomeError.data.message)
        ) {
            dispatch(
                userAuthApi.util.updateQueryData("verifyAuth", undefined, (draftPosts) => {
                    return draftPosts = {}
                })
            );
            navigate('/auth/login');
        }
    }

    // send delete request
    const handleDelete = async (id) => {
        try {
            await deleteIncome(id).unwrap();
        } catch(error) {
            console.log(error);
        }
    }

    // send edit request
    const handleEditRecord = async (editData) => {
        try {
            await editIncome(editData);
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
        {/* view expense record */}
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
            message={"Are you sure you want to delete this income item ?"}
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
