import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'antd';

import { financeAccountApi } from '../../../../store/financeAccount/financeAccount.slice';
import { ImagePreview } from '../ImagePreview/ImagePreview';
import styles from './viewModal.module.scss';
import { InlineField } from '../../../../components/Form/InlineField';


export const ViewModal = ({
    viewModalState,
    setViewModalState,
    handleEditButton,
    itemData,
    handleDelete,
    handleClose
}) => {

    const [form] = Form.useForm();

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
