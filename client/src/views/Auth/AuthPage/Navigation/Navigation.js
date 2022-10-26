import React from "react";
import styles from './navigation.module.scss';

import { Button } from "antd";

import activeDot from '../../../../assets/Auth/active-dot.svg';
import greyDot from '../../../../assets/Auth/grey-dot.svg';

export const Navigation = ({ step }) => {
    return (
        <div className={styles.bottomMenu}>
            <div className={styles.dotWrapper}>
                {step === 1 ? <img src={activeDot} alt="dot" /> : <img src={greyDot} alt="dot" />}
                {step === 2 ? <img src={activeDot} alt="dot" /> : <img src={greyDot} alt="dot" />}
                {step === 3 ? <img src={activeDot} alt="dot" /> : <img src={greyDot} alt="dot" />}
            </div>
            <div className={styles.buttonWrapper}>
                <Button className={`themed-button ${styles.back}`}>Back</Button>
                <Button className={`themed-button ${styles.next}`}>Next</Button>
            </div>
        </div>
    );
}