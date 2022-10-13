import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Form, Input, Dropdown, Menu, Space, DatePicker, Spin } from 'antd';
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

import { AddCustomModal } from '../../../components/Modals/AddCustomModal/AddCustomModal';
import { ViewCustomModal } from '../../../components/Modals/ViewCustomModal/ViewCustomModal';
import { EditCustomModal } from '../../../components/Modals/EditCustomModal/EditCustomModal';

const LoadingSpinner = () => {
    return (
        <div className={styles.spinner}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
        </div>
    );
}

export const ExpenseRecordCard = ({ dateSortByState }) => { 

    const {
        data,
        isError,
        isFetching,
        isLoading,
        isSuccess
    } = expenseApi.endpoints.getExpenses.useQueryState(dateSortByState);

    const [addModalState, setAddModalState] = useState(false);

    const [addExpense, {
        isLoading: addMutationLoading 
    }] = useAddExpenseMutation();

    // send add request
    const handleAddRecord = async (inputState) => {
        try {
            await addExpense(inputState).unwrap();
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.recordCardWrapper}>
            <div className={styles.cardHeading}>
                <p>Expense Record</p>
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
                    data !== undefined 
                    ? 
                    data.data.map((item, index) => (
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
    // view modal state
    const [viewModalState, setViewModalState] = useState(false);
    // edit modal state
    const [editModalState, setEditModalState] = useState(false);

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
    }] = useDeleteExpenseMutation();

    const [editExpense, {
        isLoading: editExpenseMutationLoading,
        data: editResponse
    }] = useEditExpenseMutation();

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

    return (
        <div className={styles.recordListItem}>
            <div onClick={() => setViewModalState(true)} className={styles.icon}>
                <FontAwesomeIcon icon={faBarsStaggered} />
            </div>

            {/* view expense record */}
            <ViewCustomModal
                viewModalState={viewModalState}
                setViewModalState={setViewModalState}
                itemData={itemData}
                handleEditButton={handleEditButton}
                handleClose={handleClose}
            />

            {/* edit expense */}
            <EditCustomModal
                editModalState={editModalState}
                setEditModalState={setEditModalState}
                itemData={itemData}
                dateSortByState={dateSortByState}
                handleEditRecord={handleEditRecord}
            />

                <p className={styles.name}>{itemData.title}</p>
                <p>{itemData.percentage}</p>
                <p className={styles.amount}>{itemData.amount}</p>
            <div onClick={() => handleDelete(itemData._id)} className={styles.closeWrapper}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    );
}