import React, { useContext } from "react";
import styles from './hamburgerIcon.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SideNavContext } from "../../pages/AppLayout";

export const HamburgerIcon = () => {

    const { active, setActive } = useContext(SideNavContext);

    return (
        <div onClick={() => setActive(active => !active)}>
            <FontAwesomeIcon className={styles.hamburger} icon={faBars} />
        </div>
    );
}