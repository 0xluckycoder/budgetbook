import React, { useState } from "react";
import styles from "./accountCardSelect.module.scss";
import { Radio } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

const plainOptions = ['Select'];

export const AccountCardSelect = ({ amount, accountName }) => {

    const [state, setState] = useState(null);
    const [hoverIconsState, setHoverIconsState] = useState(false);

    const handleIconStateChange = (isActive) => {
        isActive ? setHoverIconsState(true) : setHoverIconsState(false);
    }

    return (
        <div 
            className={styles.cardWrapper} 
            onMouseEnter={() => handleIconStateChange(true)} 
            onMouseLeave={() => handleIconStateChange(false)}
        >
            <Radio.Group options={plainOptions} onChange={() => setState('account name')} />

            <div className={styles.cardDetails}>
                <p className={styles.amount}>{amount}</p>
                <p className={styles.accountName}>{accountName}</p>
            </div>

            <div className={styles.cardFooter}>
                <p>Last Updated</p>
                <p>2022 Sep 01</p>
            </div>

            {hoverIconsState ? <FloatingIcons /> : null}
        </div>
    );
}

const FloatingIcons = () => {
    return (
        <div className={styles.floatingIconsWrapper}>        
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faPencil} />
            </div>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faBarsStaggered} />
            </div>
        </div>
    );
}