import React from "react";
import styles from './stepFour.module.scss';
import { Navigation } from "../Navigation/Navigation";
import icon from '../../../../assets/Auth/completed-icon.svg';

export const StepFour = ({
    height,
    width,
    validate,
    handleSubmit,
    handleBackNavigation
}) => {
    return (
        <div style={{
            top: `calc(50% - ${height}px/2 + 60px/2)`,
            minWidth: width,
            minHeight: height
        }} className={styles.card}>
            <div className={styles.header}>
                <h1>Almost there.</h1>
                <p>Click finish to complete the setup</p>
            </div>

            <div className={styles.iconWrapper}>
                <img src={icon} alt="final icon" draggable="false" />
            </div>

            <Navigation 
                step={3} 
                handleBackNavigation={handleBackNavigation}
                isValidated={false}
                handleSubmit={handleSubmit}
                // submitStep={submitStep}
            />

        </div>
    );
}