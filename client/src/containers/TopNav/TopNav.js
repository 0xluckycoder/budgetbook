import React, { useContext } from 'react';
import { TopNavWrapper } from '../../components/TopNav/TopNavWrapper';
import { NavLeft } from '../../components/TopNav/NavLeft';
import { ProfileCard } from '../../components/TopNav/ProfileCard';

export const TopNav = () => {
    return (
        <TopNavWrapper>
            <NavLeft hamburger={true} />
            <ProfileCard userName="Johnathan" />
        </TopNavWrapper>
    );
}