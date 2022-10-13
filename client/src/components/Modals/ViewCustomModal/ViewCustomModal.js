import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Form, Input, Dropdown, Menu, Space, DatePicker, Spin } from 'antd';
import { InlineField } from '../../../components/Form/InlineField';
import styles from './viewCustomModal.module.scss';
import { ImagePreview } from '../ImagePreview/ImagePreview';

export const ViewCustomModal = ({
    viewModalState,
    setViewModalState,
    handleEditButton,
    itemData,
    handleClose
}) => {

    const [form] = Form.useForm();

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
            // onClick={() => handleSubmit()}
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
                <p>{itemData.account}</p>
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
