import React, { useState } from "react";
import styles from "./accountCardSelect.module.scss";
import { Radio } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

import { ViewAccountModal } from "../ViewAccountModal/ViewAccountModal";
import { EditAccountModal } from "../EditAccountModal/EditAccountModal";

import { useEditAccountMutation } from "../../../store/financeAccount/financeAccount.slice";

const plainOptions = ['Select'];

export const AccountCardSelect = ({ itemData }) => {

    const [state, setState] = useState(null);
    const [hoverIconsState, setHoverIconsState] = useState(false);

    const handleIconStateChange = (isActive) => {
        isActive ? setHoverIconsState(true) : setHoverIconsState(false);
    }

    // view account modal state
    const [viewAccountState, setViewAccountState] = useState(false);
    // edit account modal state
    const [editModalState, setEditModalState] = useState(false);
    // dialogue card state
    const [dialogueCardState, setDialogueCardState] = useState(false);

    const handleClose = () => {
        setViewAccountState(false);
    }

    const [editAccount, {
        isLoading: editAccountMutationLoading,
        data: editResponse
    }] = useEditAccountMutation();

    const handleEditButton = () => {
        handleClose();
        setEditModalState(true);
    }

    // send delete request
    const handleDelete = async (id) => {
        try {
            console.log('delete record', id);
        } catch(error) {
            console.log(error);
        }
    }

    // send edit request
    const handleEditRecord = async (editData) => {
        try {
            await editAccount(editData).unwrap();
        } catch (error) {
            console.log(error);
        }
    }

    const handleConfirm = () => {
        handleDelete(itemData._id);
        setDialogueCardState(false);
    }

    return (
        <>

        {/*     viewModalState,
                handleEditButton,
                itemData,
                handleClose */}

        {/* view finance account modal */}
        <ViewAccountModal 
                viewModalState={viewAccountState}
                handleEditButton={handleEditButton}
                itemData={itemData}
                handleClose={handleClose}
        />

        {/* edit finance account */}
        <EditAccountModal
            editModalState={editModalState}
            setEditModalState={setEditModalState}
            itemData={itemData}
            handleEditRecord={handleEditRecord}
        />
            <div 
                className={styles.cardWrapper} 
                onMouseEnter={() => handleIconStateChange(true)} 
                onMouseLeave={() => handleIconStateChange(false)}
            >
                <Radio.Group options={plainOptions} onChange={() => setState('account name')} />

                <div className={styles.cardDetails}>
                    <p className={styles.amount}>{itemData.value}</p>
                    <p className={styles.accountName}>{itemData.name}</p>
                </div>

                <div className={styles.cardFooter}>
                    <p>Last Updated</p>
                    <p>2022 Sep 01</p>
                </div>

                {hoverIconsState ? <FloatingIcons 
                                        setViewAccountState={setViewAccountState}
                                    />     
                                : null}
            </div>
        </>
    );
}

const FloatingIcons = ({ setViewAccountState }) => {
    return (
        <div className={styles.floatingIconsWrapper}>        
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faPencil} />
            </div>
            <div onClick={() => setViewAccountState(true)} className={styles.icon}>
                <FontAwesomeIcon icon={faBarsStaggered} />
            </div>
        </div>
    );
}