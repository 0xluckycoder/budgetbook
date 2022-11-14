import React, { useState } from "react";
import styles from "./accountCardSelect.module.scss";
import { Radio, Tag } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

import { ViewAccountModal } from "../ViewAccountModal/ViewAccountModal";
import { EditAccountModal } from "../EditAccountModal/EditAccountModal";

import { useEditAccountMutation } from "../../../store/financeAccount/financeAccount.slice";

const plainOptions = ['Select'];

export const AccountCardSelect = ({ 
    itemData, 
    defaultAccount, 
    handleAccountSelect,
    handleDelete 
}) => {

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

    // send edit request
    const handleEditRecord = async (editData) => {
        try {
            await editAccount(editData).unwrap();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {/* view finance account modal */}
            <ViewAccountModal 
                    viewModalState={viewAccountState}
                    handleEditButton={handleEditButton}
                    itemData={itemData}
                    handleClose={handleClose}
                    handleDelete={handleDelete}
            />

            {/* edit finance account */}
            <EditAccountModal
                editModalState={editModalState}
                setEditModalState={setEditModalState}
                itemData={itemData}
                handleEditRecord={handleEditRecord}
            />
            <div 
                className={`${styles.cardWrapper} ${itemData._id === defaultAccount && styles.selectedCard}`} 
                onMouseEnter={() => handleIconStateChange(true)} 
                onMouseLeave={() => handleIconStateChange(false)}
                onClick={(e) => handleAccountSelect(e, itemData._id)}
            >

                {itemData._id === defaultAccount && <div><Tag className={styles.tag} color="#6F6AF8">Selected</Tag></div>}

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
                                        setEditModalState={setEditModalState}
                                    />     
                : null}
            </div>
        </>
    );
}

const FloatingIcons = ({ setEditModalState, setViewAccountState }) => {
    return (
        <div className={styles.floatingIconsWrapper}>        
            <div id="floating-icons" onClick={() => setEditModalState(true)} className={styles.icon}>
                <FontAwesomeIcon id="floating-icons" icon={faPencil} />
            </div>
            <div id="floating-icons" onClick={() => setViewAccountState(true)} className={styles.icon}>
                <FontAwesomeIcon id="floating-icons" icon={faBarsStaggered} />
            </div>
        </div>
    );
}