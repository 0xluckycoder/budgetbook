import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Button } from "antd";
import { InlineField } from "../../../components/Form/InlineField";
import { DialogueCard } from '../../../components/DialogueCard/DialogueCard';
import styles from './viewAccountModal.module.scss';
// import { useDeleteAccountMutation } from "../../../store/financeAccount/financeAccount.slice";

export const ViewAccountModal = ({
    viewModalState,
    handleEditButton,
    itemData,
    handleClose,
    handleDelete
}) => {

    const [form] = Form.useForm();
    const [dialogueCardState, setDialogueCardState] = useState(false);

    // handle confirm before delete dialogue
    const handleConfirm = () => {
        handleDelete(itemData._id);
        setDialogueCardState(dialogueCardState => !dialogueCardState);
    }

    return (
        <Modal
            title="Finance Account Item"
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
                onClick={() => setDialogueCardState(true)}
                >
                    Delete
                </Button>
            ]}
        >

            {/* Warning Dialogue Card */}
            <DialogueCard 
                message={"Are you sure you want to delete this expense item ?"}
                dialogueCardState={dialogueCardState}
                setDialogueCardState={setDialogueCardState}
                handleConfirm={handleConfirm}
            />

            <Form form={form} layout="vertical">
                <InlineField>
                    <Form.Item label="Title">
                        <p>{itemData.name}</p>
                    </Form.Item>
                    <Form.Item label="Amount">
                        <p>{itemData.currencyType}</p>
                    </Form.Item>
                </InlineField>

                <InlineField>
                    <Form.Item label="Initial Value">
                        <p>{itemData.value}</p>
                    </Form.Item>
                </InlineField>

                <InlineField>
                    <Form.Item label="Comment">
                        <p>{itemData.description}</p>
                    </Form.Item>
                </InlineField>
            </Form>

        </Modal>
    );
}