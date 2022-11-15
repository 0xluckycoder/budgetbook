import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Form, Input, Dropdown, Menu, Space, DatePicker, Spin } from 'antd';
import { InlineField } from '../../../components/Form/InlineField';
import styles from './viewCustomModal.module.scss';
import { ImagePreview } from '../ImagePreview/ImagePreview';

import { DialogueCard } from '../../DialogueCard/DialogueCard';

import { financeAccountApi } from '../../../store/financeAccount/financeAccount.slice';

import { 
    useDeleteExpenseMutation,
} from '../../../store/expense/expense.slice';

export const ViewCustomModal = ({
    viewModalState,
    setViewModalState,
    handleEditButton,
    itemData,
    handleDelete,
    handleClose
}) => {

    const [form] = Form.useForm();
    const [dialogueCardState, setDialogueCardState] = useState(false);

    // delete mutation
    const [deleteExpense, {
        data: deleteResponse,        
        isLoading: deleteExpenseMutationLoading,
    }] = useDeleteExpenseMutation();

    // send delete request
    // const handleDelete = async (id) => {
    //     alert(`expense ${id}`);
    //     // try {
    //     //     await deleteExpense(id).unwrap();
    //     // } catch(error) {
    //     //     console.log(error);
    //     // }
    // }

    const [financeAccountState, setFinanceAccountState] = useState([]);

    const {
        data: financeAccountData,
        isFetching: financeAccountFetching,
        isLoading: financeAccountLoading,
        isUninitialized: financeAccountUninitiated,
    } = financeAccountApi.endpoints.getAccounts.useQueryState();

    useEffect(() => {
        if (!financeAccountLoading && !financeAccountFetching && !financeAccountUninitiated) {
            setFinanceAccountState(financeAccountData.data);
        }
    }, [financeAccountData]);

    // handle dialogue card confirm
    const handleConfirm = () => {
        handleDelete(itemData._id);
        setDialogueCardState(dialogueCardState => !dialogueCardState);
        // handleClose();
    };

    const financeAccountName = financeAccountState.length > 0 && financeAccountState.find(account => account._id === itemData.accountId);

    return (
        <Modal
            title="Expense Item"
            centered
            open={viewModalState}
            onCancel={() => handleClose()}
            className={styles.viewModal}
            footer={[
            <Button 
                key={1}
                className="themed-button"
                onClick={() => handleEditButton()}
            >
                Edit
            </Button>,
            <Button 
                key={2}
                className="themed-button"
                onClick={() => handleDelete(itemData._id)}
            >
                Delete
            </Button>
            ]}
        >

        {/* Warning Dialogue Card */}
        {/* <DialogueCard 
            message={"Are you sure you want to delete this expense item ?"}
            dialogueCardState={dialogueCardState}
            setDialogueCardState={setDialogueCardState}
            handleConfirm={handleConfirm}
        /> */}

        <Form form={form} layout="vertical">
            <InlineField>
                <Form.Item label="Title">
                    <p>{itemData.title}</p>
                </Form.Item>
                <Form.Item label="Amount">
                    <p>{itemData.amount}</p>
                </Form.Item>
            </InlineField>

            <InlineField>
                <Form.Item label="Account">
                    <p>{financeAccountName.name}</p>
                </Form.Item>
                <Form.Item label="Category">
                    <p>{itemData.category}</p>
                </Form.Item>
            </InlineField>

            <Form.Item label="Date">
                <p>{itemData.transactionDate}</p>
            </Form.Item>

            <Form.Item label="Comment">
                <p>{itemData.comment}</p>
            </Form.Item>

            <Form.Item label="Add Photos">
                <div className={styles.verticalImageSlider}>
                    {
                        itemData.photos.length > 0 
                        && itemData.photos.map((imageItem, index) => <ImagePreview 
                                                                        key={index}
                                                                        imageSrc={imageItem}
                                                                        setImageState={null}
                                                                        imageState={null}
                                                                        inputState={null}
                                                                        hideDelete={true}
                                                                    />)
                    }
                </div>
            </Form.Item>
        </Form>
        </Modal>
    );
}
