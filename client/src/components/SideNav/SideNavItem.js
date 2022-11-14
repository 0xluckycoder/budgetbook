import React from "react";
import styles from './sideNavItem.module.scss';
import { useNavigate, useLocation } from "react-router-dom";

export const SideNavItem = ({ icon, name }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = () => {
        navigate(`/app/${name.toLowerCase()}`);
    }

    const currentPage = location.pathname.split('/')[2];

    return (
        <div 
            onClick={() => handleNavClick()} 
            className={`${styles.sideNavItem} ${currentPage === name.toLowerCase() && styles.activeButton}`}
        >
            <img alt="left menu icon" src={icon} />
            <p>{name}</p>
        </div>
    )
}